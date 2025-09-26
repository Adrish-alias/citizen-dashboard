import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RedemptionModal = ({ item, isOpen, onClose, onConfirm, userPoints }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen || !item) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm(item, deliveryAddress);
    setIsConfirming(false);
    setDeliveryAddress('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Confirm Redemption</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Item Details */}
          <div className="flex space-x-4 mb-6">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{item?.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
              <div className="flex items-center space-x-2">
                <Icon name="Coins" size={16} className="text-accent" />
                <span className="font-bold text-foreground">{item?.points?.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">points</span>
              </div>
            </div>
          </div>

          {/* Points Balance */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Current Balance:</span>
              <span className="font-semibold text-foreground">{userPoints?.toLocaleString()} points</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Cost:</span>
              <span className="font-semibold text-foreground">-{item?.points?.toLocaleString()} points</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Remaining Balance:</span>
                <span className="font-bold text-primary">
                  {(userPoints - item?.points)?.toLocaleString()} points
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          {item?.requiresAddress && (
            <div className="mb-6">
              <Input
                label="Delivery Address"
                type="text"
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e?.target?.value)}
                required
                description="Required for physical item delivery"
              />
            </div>
          )}

          {/* Terms */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Redemption Terms:</p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Points will be deducted immediately upon confirmation</li>
                  <li>• Redemptions are non-refundable</li>
                  <li>• Delivery may take 5-7 business days</li>
                  <li>• Items subject to availability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isConfirming}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleConfirm}
              loading={isConfirming}
              disabled={item?.requiresAddress && !deliveryAddress?.trim()}
              iconName="Gift"
              iconPosition="left"
              fullWidth
            >
              {isConfirming ? "Processing..." : "Confirm Redemption"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionModal;