import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RedemptionHistory = ({ redemptions, className = '' }) => {
  if (!redemptions || redemptions?.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border p-8 text-center ${className}`}>
        <Icon name="Gift" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Redemptions Yet</h3>
        <p className="text-muted-foreground">Start earning points and redeem your first reward!</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-success';
      case 'shipped': return 'text-primary';
      case 'processing': return 'text-warning';
      case 'cancelled': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'CheckCircle';
      case 'shipped': return 'Truck';
      case 'processing': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Package';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Redemption History</h3>
        <p className="text-sm text-muted-foreground">Track your redeemed rewards</p>
      </div>
      <div className="divide-y divide-border">
        {redemptions?.map((redemption) => (
          <div key={redemption?.id} className="p-6 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex space-x-4">
              <Image
                src={redemption?.item?.image}
                alt={redemption?.item?.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground truncate">{redemption?.item?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Redeemed on {new Date(redemption.redeemedAt)?.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Icon name="Coins" size={14} className="text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {redemption?.pointsUsed?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-2 ${getStatusColor(redemption?.status)}`}>
                    <Icon name={getStatusIcon(redemption?.status)} size={16} />
                    <span className="text-sm font-medium capitalize">{redemption?.status}</span>
                  </div>
                  
                  {redemption?.trackingNumber && (
                    <div className="text-xs text-muted-foreground">
                      Tracking: {redemption?.trackingNumber}
                    </div>
                  )}
                </div>

                {redemption?.estimatedDelivery && redemption?.status !== 'delivered' && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated delivery: {new Date(redemption.estimatedDelivery)?.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedemptionHistory;