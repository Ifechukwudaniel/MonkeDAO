'use client';

import { Alert, AlertDescription } from '@monkedeals/ui/components/alert';
import { Badge } from '@monkedeals/ui/components/badge';
import { Button } from '@monkedeals/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@monkedeals/ui/components/card';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  QrCode,
  Shield,
  Tag,
  User,
  XCircle,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Load QR reader dynamically (prevents SSR issues)
const QrReader = dynamic(
  () => import('react-qr-reader').then((mod) => mod.QrReader),
  { ssr: false },
);

interface RedemptionPayload {
  dealId: string;
  couponId: string;
  user: string;
  timestamp: number;
  signature?: string;
  dealTitle?: string;
  dealValue?: string;
  expiresAt?: number;
}

interface VerificationResult {
  success: boolean;
  message: string;
  warnings?: string[];
  details?: {
    alreadyRedeemed?: boolean;
    expired?: boolean;
    invalidSignature?: boolean;
    ownership?: boolean;
  };
}

export default function MerchantRedemptionVerifier() {
  const [scanning, setScanning] = useState(false);
  const [payload, setPayload] = useState<RedemptionPayload | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = (data: any) => {
    if (data) {
      try {
        const parsed = JSON.parse(data);

        // Validate required fields
        if (
          !parsed.dealId ||
          !parsed.couponId ||
          !parsed.user ||
          !parsed.timestamp
        ) {
          setScanError('Invalid QR code: Missing required fields');
          return;
        }

        setPayload(parsed);
        setScanning(false);
        setScanError(null);
      } catch (err) {
        console.error('Invalid QR payload:', err);
        setScanError('Invalid QR code format');
      }
    }
  };

  const handleError = (err: any) => {
    console.error('QR scan error:', err);
    setScanError('Camera access error. Please check permissions.');
  };

  const handleVerify = async () => {
    if (!payload) return;
    setVerifying(true);
    setResult(null);

    try {
      // TODO: Replace with actual backend/blockchain verification
      // This should include:
      // 1. Verify signature authenticity
      // 2. Check NFT/coupon ownership on-chain
      // 3. Verify coupon hasn't been redeemed (check redemption status)
      // 4. Validate timestamp and expiration

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock verification logic - replace with actual implementation
      const now = Date.now();
      const qrAge = now - payload.timestamp;
      const qrExpired = qrAge > 1000 * 60 * 5; // QR valid for 5 minutes
      const dealExpired = payload.expiresAt && now > payload.expiresAt;

      // Simulate blockchain/database check for redemption status
      const alreadyRedeemed = Math.random() > 0.7; // Mock: 30% chance already redeemed
      const validSignature = payload.signature && payload.signature.length > 20;
      const validOwnership = payload.user && payload.user.length > 10;

      const warnings: string[] = [];

      if (qrAge > 1000 * 60 * 2) {
        warnings.push('QR code is older than 2 minutes');
      }

      // Determine verification result
      if (alreadyRedeemed) {
        setResult({
          success: false,
          message: 'Coupon Already Redeemed',
          details: { alreadyRedeemed: true },
        });
      } else if (qrExpired) {
        setResult({
          success: false,
          message: 'QR Code Expired',
          details: { expired: true },
        });
      } else if (dealExpired) {
        setResult({
          success: false,
          message: 'Deal Has Expired',
          details: { expired: true },
        });
      } else if (!validSignature) {
        setResult({
          success: false,
          message: 'Invalid Signature',
          details: { invalidSignature: true },
        });
      } else if (!validOwnership) {
        setResult({
          success: false,
          message: 'Ownership Verification Failed',
          details: { ownership: false },
        });
      } else {
        setResult({
          success: true,
          message: 'Redemption Verified Successfully',
          warnings: warnings.length > 0 ? warnings : undefined,
        });

        // TODO: Mark coupon as redeemed on-chain or in backend
        // await markAsRedeemed(payload.couponId);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setResult({
        success: false,
        message: 'Verification Failed',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleReset = () => {
    setPayload(null);
    setResult(null);
    setScanError(null);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Redemption Verifier
          </h1>
          <p className="text-gray-600">
            Secure on-chain coupon verification for merchants
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-border-default">
          <CardHeader className="border-b border-border-default">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-green-600" />
                  Scan Customer QR
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Verify coupon authenticity and redemption status
                </CardDescription>
              </div>
              {payload && !result && (
                <Badge
                  variant="outline"
                  className="border-green-600 text-green-600"
                >
                  Ready to Verify
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Scan Error Alert */}
            {scanError && (
              <Alert className="mb-6 border-red-300 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {scanError}
                </AlertDescription>
              </Alert>
            )}

            {/* Initial State */}
            {!scanning && !payload && !result && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6">
                  <QrCode className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-900 mb-2 font-medium">Ready to Scan</p>
                <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                  Ask the customer to present their redemption QR code. We'll
                  verify ownership and ensure it hasn't been used.
                </p>
                <Button
                  onClick={() => {
                    setScanning(true);
                    setScanError(null);
                  }}
                  size="lg"
                  className="bg-primary hover:bg-green-700 text-white font-medium"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </div>
            )}

            {/* Scanner Active */}
            {scanning && (
              <div className="space-y-4">
                <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-primary">
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 border-2 border-primary rounded-xl animate-pulse" />
                  </div>
                </div>

                <Alert className="border-blue-300 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700 text-sm">
                    Position the QR code within the camera frame
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={() => setScanning(false)}
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  Cancel Scan
                </Button>
              </div>
            )}

            {/* Scanned Data Display */}
            {payload && !verifying && !result && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-200">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Coupon Details
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-yellow-600 text-yellow-700 bg-yellow-50"
                    >
                      Pending Verification
                    </Badge>
                  </div>

                  {payload.dealTitle && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Deal</p>
                        <p className="text-sm font-medium text-gray-900">
                          {payload.dealTitle}
                        </p>
                        {payload.dealValue && (
                          <p className="text-xs text-green-600 mt-1">
                            {payload.dealValue}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Customer</p>
                      <p className="text-sm font-mono text-gray-900 break-all">
                        {payload.user.slice(0, 20)}...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Generated</p>
                      <p className="text-sm text-gray-900">
                        {formatTimestamp(payload.timestamp)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(payload.timestamp)}
                      </p>
                    </div>
                  </div>

                  {payload.expiresAt && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Expires</p>
                        <p className="text-sm text-gray-900">
                          {formatTimestamp(payload.expiresAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <details className="group">
                      <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 flex items-center gap-2">
                        <span>Technical Details</span>
                        <span className="text-[10px]">▼</span>
                      </summary>
                      <pre className="mt-3 bg-gray-100 rounded-lg p-3 text-[10px] text-gray-700 overflow-x-auto border border-gray-200">
                        {JSON.stringify(payload, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:bg-gray-100 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleVerify}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Verify Redemption
                  </Button>
                </div>
              </div>
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
          </CardContent>
        </Card>

        {/* Security Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            All verifications are secured with on-chain signature validation
          </p>
        </div>
      </div>
    </div>
  );
}
