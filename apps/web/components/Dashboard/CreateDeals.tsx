'use client';

import { Badge } from '@monkedeals/ui/components/badge';
import { Button } from '@monkedeals/ui/components/button';
import { Card, CardContent, CardHeader } from '@monkedeals/ui/components/card';
import { Input } from '@monkedeals/ui/components/input';
import { Label } from '@monkedeals/ui/components/label';
import RichTextEditor from 'components/RichTextEditor';
import StepperIndicator from 'components/StepperIndicator';
import React, { useState } from 'react';
import { CategorySelect } from './CategorySelect';
import FileUpload from './FileUpload';

// -------------- Types --------------
interface DealFormData {
  dealUrl: string;
  dealTitle: string;
  salePrice: string;
  listPrice: string;
  description: string;
  categories: string[];
  tags: string[];
  brands: string[];
  couponType: string;
  merchantWallet: string;
  images: File[];
}

const COUPON_TYPES = [
  'Discount Code',
  'Cashback',
  'BOGO (Buy One Get One)',
  'Free Shipping',
  'NFT Reward',
];

// -------------- Component --------------
export const CreateDealForm: React.FC = () => {
  const [formData, setFormData] = useState<DealFormData>({
    dealUrl: '',
    dealTitle: '',
    salePrice: '',
    listPrice: '',
    description: '',
    categories: [],
    tags: [],
    brands: [],
    couponType: COUPON_TYPES[0] ?? '',
    merchantWallet: '',
    images: [],
  });
  const [activeStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Deal Data:', formData);
    // TODO: integrate with backend or NFT mint logic
  };

  return (
    <Card className="max-w-2xl mx-auto border border-[#C4C4C4] rounded-sm shadow-none">
      <CardHeader>
        <h2 className="text-3xl font-semibold text-center">Post a new Deal</h2>
        <p className="text-sm  text-center text-gray-200">
          Want to post a great deal? Keep your title clear and include price,
          store, and perks!
        </p>
      </CardHeader>

      <CardContent>
        <StepperIndicator activeStep={activeStep} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="dealUrl" className=" text-sm mb-1">
              Deal URL (optional)
            </Label>
            <Input
              id="dealUrl"
              name="dealUrl"
              value={formData.dealUrl}
              onChange={handleChange}
              placeholder="https://..."
              className=" focus:ring-primary"
            />
          </div>

          {/* Deal Title */}
          <div>
            <Label htmlFor="dealTitle">Deal Title *</Label>
            <Input
              id="dealTitle"
              name="dealTitle"
              value={formData.dealTitle}
              onChange={handleChange}
              required
              placeholder='example. "65” TCL QLED 4K TV + Free Shipping $549"'
              className=" focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description mb-1 inline-block">Description</Label>
            <RichTextEditor />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="$549"
                className=" focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="listPrice">List Price</Label>
              <Input
                id="listPrice"
                name="listPrice"
                type="number"
                value={formData.listPrice}
                onChange={handleChange}
                placeholder="$799"
                className=" focus:ring-green-500"
              />
            </div>
          </div>

          <CategorySelect />

          {/* Categories, Stores, Brands */}
          <div className="grid grid-cols-1 gap-4">
            <TagInput
              label="tags"
              name="tags"
              tags={formData.tags}
              setFormData={setFormData}
            />
          </div>

          {/* File Upload */}
          <FileUpload
            files={formData.images}
            onFilesChange={(files) =>
              setFormData((prev) => ({ ...prev, images: files }))
            }
            label="Images & Attachments"
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-primary uppercase font-medium  hover:bg-green-700 text-white"
          >
            Post Deal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// -------------- Tag Input (mini component) --------------
interface TagInputProps {
  label: string;
  name: keyof DealFormData;
  tags: string[];
  setFormData: React.Dispatch<React.SetStateAction<DealFormData>>;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  name,
  tags,
  setFormData,
}) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...(prev[name] as string[]), input.trim()],
      }));
      setInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: (prev[name] as string[]).filter((t) => t !== tag),
    }));
  };

  return (
    <div>
      <Label className="mb-1 mt-4 capitalize">{label}</Label>

      <div className="flex gap-2 mt-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add..."
          className=" focus:ring-primary"
        />
        <Button
          type="button"
          onClick={addTag}
          className="bg-primary hover:bg-primary uppercase font-medium text-white"
        >
          Add
        </Button>
      </div>
      <div className="flex gap-2 mt-1 flex-wrap">
        {tags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => removeTag(tag)}
            className="cursor-pointer bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
          >
            {tag} ✕
          </Badge>
        ))}
      </div>
    </div>
  );
};
