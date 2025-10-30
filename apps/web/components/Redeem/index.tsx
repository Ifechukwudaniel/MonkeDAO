'use client';
import { Alert, AlertDescription } from '@monkedeals/ui/components/alert';
import { Button } from '@monkedeals/ui/components/button';
import { Card, CardContent } from '@monkedeals/ui/components/card';
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  QrCode,
  Shield,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import type { RedemptionPayload, VerificationResult } from 'types';
import { validateQrPayload, verifyRedemption } from 'utils';
import { RedeemDetails } from './RedeemDetails';
import { RedeemScanner } from './Scanner';

export const MerchantRedemptionVerifier = () => {
  const [scanning, setScanning] = useState(false);
  const [payload, setPayload] = useState<RedemptionPayload | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = (data: string) => {
    const parsed = validateQrPayload(data);
    if (!parsed) return setError('Invalid QR code');
    setPayload(parsed);
    setScanning(false);
    setError(null);
  };

  const handleVerify = async () => {
    if (!payload) return;
    setVerifying(true);
    const res = await verifyRedemption(payload);
    setResult(res);
    setVerifying(false);
  };

  const handleReset = () => {
    setPayload(null);
    setResult(null);
    setScanError(null);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardContent>
          {!scanning && !payload && (
            <div className="text-center py-8">
              <QrCode className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="mb-4 text-gray-600">
                Scan customer QR code to verify
              </p>
              <button onClick={() => setScanning(true)} className="btn-primary">
                Start Scanning
              </button>
            </div>
          )}

          {scanning && (
            <RedeemScanner
              onScan={handleScan}
              onCancel={() => setScanning(false)}
              error={error}
            />
          )}

          {payload && !verifying && !result && (
            <RedeemDetails
              payload={payload}
              onVerify={handleVerify}
              onCancel={() => setPayload(null)}
            />
          )}

          {/* Verifying State */}
          {verifying && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Verifying On-Chain...
              </p>
              <p className="text-sm text-gray-600">
                Checking ownership and redemption status
              </p>
            </div>
          )}

          {/* Success Result */}
          {result?.success && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Verified Successfully!
                </h3>
                <p className="text-gray-700 mb-1">{result.message}</p>
                <p className="text-sm text-gray-600">
                  Coupon has been marked as redeemed
                </p>
              </div>

              {result.warnings && result.warnings.length > 0 && (
                <Alert className="border-yellow-300 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700 text-sm">
                    <ul className="list-disc list-inside">
                      {result.warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {payload && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Redeemed</p>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {payload.dealTitle || 'Deal'}
                  </p>
                  <p className="text-xs text-gray-600 font-mono">
                    {payload.couponId}
                  </p>
                </div>
              )}

              <Button
                onClick={handleReset}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white"
              >
                Scan Another Coupon
              </Button>
            </div>
          )}

          {/* Error Result */}
          {result && !result.success && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Verification Failed
                </h3>
                <p className="text-red-600 font-medium mb-1">
                  {result.message}
                </p>
              </div>

              <Alert className="border-red-300 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700 text-sm">
                  {result.details?.alreadyRedeemed &&
                    'This coupon has already been used and cannot be redeemed again.'}
                  {result.details?.expired &&
                    'This coupon or QR code has expired.'}
                  {result.details?.invalidSignature &&
                    'The signature verification failed. This may be a fraudulent QR code.'}
                  {result.details?.ownership === false &&
                    'Could not verify customer ownership of this coupon.'}
                  {!result.details &&
                    'An error occurred during verification. Please try again.'}
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleReset}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white"
              >
                Try Again
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              All verifications are secured with on-chain signature validation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
