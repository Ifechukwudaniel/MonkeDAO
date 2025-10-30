import { Badge } from '@monkedeals/ui/components/badge';
import { Button } from '@monkedeals/ui/components/button';
import { Calendar, Clock, Shield, Tag, User } from 'lucide-react';
import { RedemptionPayload } from 'types';
import { formatTimeAgo, formatTimestamp } from 'utils';

interface RedeemDetailsProps {
  payload: RedemptionPayload;
  onVerify: () => void;
  onCancel: () => void;
}

export const RedeemDetails = ({
  payload,
  onVerify,
  onCancel,
}: RedeemDetailsProps) => (
  <div className="space-y-6">
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Coupon Details</h3>
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
    </div>

    <div className="flex gap-3">
      <Button
        onClick={onCancel}
        variant="outline"
        className="flex-1 border-gray-300 text-gray-700"
      >
        Cancel
      </Button>
      <Button
        onClick={onVerify}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
      >
        <Shield className="w-4 h-4 mr-2" />
        Verify Redemption
      </Button>
    </div>
  </div>
);
