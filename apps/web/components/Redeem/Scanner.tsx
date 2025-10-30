'use client';

import { Alert, AlertDescription } from '@monkedeals/ui/components/alert';
import { Button } from '@monkedeals/ui/components/button';
import { Info } from 'lucide-react';
import dynamic from 'next/dynamic';

const QrReader = dynamic(
  () => import('react-qr-reader').then((m) => m.QrReader),
  { ssr: false },
);

interface RedeemScannerProps {
  onScan: (data: string) => void;
  onCancel: () => void;
  error?: string | null;
}

export const RedeemScanner = ({
  onScan,
  onCancel,
  error,
}: RedeemScannerProps) => (
  <div className="space-y-4">
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-primary">
      <QrReader
        scanDelay={300}
        constraints={{ facingMode: 'environment' }}
        onResult={(result, err) => {
          const text = (result as any)?.getText?.();
          if (text) onScan(text);
          if (err) console.error(err);
        }}
        videoStyle={{ width: '100%' }}
      />
      <div className="absolute inset-0 border-2 border-primary rounded-xl animate-pulse pointer-events-none" />
    </div>

    {error && (
      <Alert className="border-red-300 bg-red-50">
        <AlertDescription className="text-red-700 text-sm">
          {error}
        </AlertDescription>
      </Alert>
    )}

    <Alert className="border-blue-300 bg-blue-50">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="text-primary text-sm">
        Position the QR code within the camera frame
      </AlertDescription>
    </Alert>

    <Button
      onClick={onCancel}
      variant="outline"
      className="w-full border-gray-300 text-gray-700"
    >
      Cancel Scan
    </Button>
  </div>
);
