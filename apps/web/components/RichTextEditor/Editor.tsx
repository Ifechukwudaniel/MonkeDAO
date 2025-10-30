import { Button } from '@monkedeals/ui/components/button';
import { Lock, LockOpen, TextFields } from '@mui/icons-material';
import { Stack } from '@mui/material';
import type { EditorOptions } from '@tiptap/core';
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  TableBubbleMenu,
  insertImages,
  type RichTextEditorRef,
} from 'mui-tiptap';
import { useCallback, useRef, useState } from 'react';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtentions';

const exampleContent =
  '<h2 style="text-align: center"> Solana Breakpoint 2025 – Exclusive Early Bird Deal</h2> <p> Get ready for <strong>the biggest Solana event of the year</strong> — <a target="_blank" rel="noopener noreferrer nofollow" href="https://solana.com/breakpoint"> Solana Breakpoint 2025</a>!  Join builders, founders, degens, and investors in Lisbon 🇵 for 4 days of alpha, innovation, and unforgettable vibes.</p> <ul><li><p><strong>Dates:</strong> November 6–9, 2025</p></li><li><p><strong>Location:</strong> Lisbon, Portugal</p></li><li><p><strong>Speakers:</strong> Anatoly Yakovenko, Raj Gokal, Armani Ferrante, and more</p></li><li><p><strong>Bonus:</strong> Free access to the <em>Builders Lounge</em> + exclusive swag </p></li></ul> <p> <mark data-color="#d1ffd7" style="background-color: #d1ffd7; color: inherit;"> Save 30%</mark> on your <strong>Early Bird Pass</strong> — only available until <span style="color: #ff6600"><strong>October 31st, 2025</strong></span>.</p> <p><strong>Included Perks:</strong></p><table><tbody> <tr><th><p>Perk</p></th><th><p>Value</p></th><th><p>Status</p></th> </tr> <tr> <td><p>Conference Pass</p></td><td><p>$499</p></td>  <td><p>✅ Included</p></td></tr><tr><td><p>Afterparty Access</p></td><td><p>$150</p></td><td><p>✅ Included</p></td></tr><tr><td><p>Workshop Pass</p></td><td><p>$200</p></td>  <td><p>❌ Optional</p></td></tr></tbody></table><p>You’ll also meet top ecosystem projects like <strong>Phantom</strong>, <strong>Jupiter</strong>,<strong>Drift</strong>, <strong>Helius</strong>, and <strong>Sandworm</strong> </p><blockquote> <p> “Breakpoint is where the next wave of builders and ideas are born.”<br />  — <em>Anatoly Yakovenko</em> </p></blockquote><p><strong>Don’t fade this alpha.</strong> <span style="color: #22c55e">Grab your pass, book your flight, and build IRL.</span><br />#SolanaBreakpoint #Lisbon2025</p><img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e" alt="Lisbon Skyline" width="400" height="auto" style="border-radius: 8px; margin-top: 10px;" />';

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || '').toLowerCase();
    return mimeType.startsWith('image/');
  });
}

export default function Editor() {
  const extensions = useExtensions({
    placeholder: 'Add your own content here...',
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      // For the sake of a demo, we don't have a server to upload the files to,
      // so we'll instead convert each one to a local "temporary" object URL.
      // This will not persist properly in a production setting. You should
      // instead upload the image files to your server, or perhaps convert the
      // images to bas64 if you would like to encode the image data directly
      // into the editor content, though that can make the editor content very
      // large. You will probably want to use the same upload function here as
      // for the MenuButtonImageUpload `onUploadFiles` prop.
      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        position: insertPosition,
      });
    },
    [],
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions['editorProps']['handleDrop']> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          // Return true to treat the event as handled. We call preventDefault
          // ourselves for good measure.
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles],
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions['editorProps']['handlePaste']> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files,
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles],
    );

  const [submittedContent, setSubmittedContent] = useState('');

  return (
    <>
      <RichTextEditor
        ref={rteRef}
        extensions={extensions}
        content={exampleContent}
        editable={isEditable}
        immediatelyRender={false}
        editorProps={{
          handleDrop: handleDrop,
          handlePaste: handlePaste,
          attributes: {
            class: 'prose prose-sm focus:outline-none p-4 px-6 min-h-[200px]',
          },
        }}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          // The "outlined" variant is the default (shown here only as
          // example), but can be changed to "standard" to remove the outlined
          // field border from the editor
          MenuBarProps: {
            hide: !showMenuBar,
            sx: {
              backgroundColor: ' #fcfbf2',
              borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            },
          },

          sx: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#fcfbf2',
              '& fieldset': {
                borderColor: 'rgba(0,0,0,0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0,0,0,0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: ' #4a8f5d',
              },
            },
          },
          // Below is an example of adding a toggle within the outlined field
          // for showing/hiding the editor menu bar, and a "submit" button for
          // saving/viewing the HTML content
          footer: (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                borderTopStyle: 'solid',
                borderTopWidth: 1,
                borderTopColor: (theme) => theme.palette.divider,
                py: 1,
                px: 1.5,
              }}
            >
              <MenuButton
                value="formatting"
                tooltipLabel={
                  showMenuBar ? 'Hide formatting' : 'Show formatting'
                }
                size="small"
                onClick={() => setShowMenuBar((currentState) => !currentState)}
                selected={showMenuBar}
                IconComponent={TextFields}
              />

              <MenuButton
                value="formatting"
                tooltipLabel={
                  isEditable
                    ? 'Prevent edits (use read-only mode)'
                    : 'Allow edits'
                }
                size="small"
                onClick={() => setIsEditable((currentState) => !currentState)}
                selected={!isEditable}
                IconComponent={isEditable ? Lock : LockOpen}
              />

              <Button
                className="bg-primary text-white uppercase font-medium text-sm"
                onClick={() => {
                  setSubmittedContent(rteRef.current?.editor?.getHTML() ?? '');
                }}
              >
                Save
              </Button>
            </Stack>
          ),
        }}
        sx={{
          // An example of how editor styles can be overridden. In this case,
          // setting where the scroll anchors to when jumping to headings. The
          // scroll margin isn't built in since it will likely vary depending on
          // where the editor itself is rendered (e.g. if there's a sticky nav
          // bar on your site).
          '& .ProseMirror': {
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>

      {/*   {submittedContent ? (
        <>
          <pre style={{ marginTop: 10, overflow: 'auto', maxWidth: '100%' }}>
            <code>{submittedContent}</code>
          </pre>

          <Box mt={3}>
            <Typography variant="overline" sx={{ mb: 2 }}>
              Read-only saved snapshot:
            </Typography>

            <RichTextReadOnly
              content={submittedContent}
              extensions={extensions}
            />
          </Box>
        </>
      ) : (
        <>
          Press “Save” above to show the HTML markup for the editor content.
          Typically you’d use a similar <code>editor.getHTML()</code> approach
          to save your data in a form.
        </>
      )} */}
    </>
  );
}
