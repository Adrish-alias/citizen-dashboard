import React, { useMemo, useState } from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const DEVICE_PRESETS = [
  { id: 'iphone14', name: 'iPhone 14', w: 390, h: 844, radius: 40 },
  { id: 'pixel7', name: 'Pixel 7', w: 412, h: 915, radius: 38 },
  { id: 'iphoneSE', name: 'iPhone SE', w: 375, h: 667, radius: 32 },
  { id: 'custom', name: 'Custom', w: 390, h: 844, radius: 40 },
];

const PhoneFrame = ({ width, height, radius, children }) => {
  return (
    <div className="relative" style={{ width: width + 28, height: height + 28 }}>
      {/* Outer phone body */}
      <div
        className="absolute inset-0 rounded-[42px] shadow-elevation-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/40"
        style={{ borderRadius: `${radius + 12}px` }}
      />
      {/* Inner bezel */}
      <div
        className="absolute inset-3 rounded-[36px] bg-gradient-to-br from-gray-800 to-gray-900 border border-black/40"
        style={{ borderRadius: `${radius + 4}px` }}
      />
      {/* Notch */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-5 bg-black/90 rounded-b-2xl" />

      {/* Screen */}
      <div
        className="absolute inset-4 overflow-hidden bg-black rounded-3xl"
        style={{ width, height, borderRadius: `${radius}px` }}
      >
        {children}
      </div>

      {/* Side buttons (decoration) */}
      <div className="absolute -left-1 top-24 w-1 h-16 bg-gray-700 rounded-r" />
      <div className="absolute -right-1 top-36 w-1 h-10 bg-gray-700 rounded-l" />
      <div className="absolute -right-1 top-52 w-1 h-10 bg-gray-700 rounded-l" />
    </div>
  );
};

const PreviewPage = () => {
  const [deviceId, setDeviceId] = useState('iphone14');
  const [customW, setCustomW] = useState(390);
  const [customH, setCustomH] = useState(844);
  const [customR, setCustomR] = useState(40);
  const [targetRoute, setTargetRoute] = useState('/dashboard-overview');

  const device = useMemo(() => DEVICE_PRESETS.find(d => d.id === deviceId) || DEVICE_PRESETS[0], [deviceId]);
  const width = deviceId === 'custom' ? customW : device.w;
  const height = deviceId === 'custom' ? customH : device.h;
  const radius = deviceId === 'custom' ? customR : device.radius;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const src = `${origin}${targetRoute || '/'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-3 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-inner-glow">
              <Icon name="Smartphone" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Preview in Phone Frame</h1>
              <p className="text-sm text-muted-foreground">Record a realistic mobile view of any route</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {DEVICE_PRESETS.map(preset => (
              <Button
                key={preset.id}
                size="sm"
                variant={deviceId === preset.id ? 'default' : 'outline'}
                onClick={() => setDeviceId(preset.id)}
                className="whitespace-nowrap"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <Icon name="Link" size={16} className="text-muted-foreground" />
              <input
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={targetRoute}
                onChange={e => setTargetRoute(e.target.value)}
                placeholder="/dashboard-overview"
              />
            </div>

            <div className="flex items-center gap-2">
              <Icon name="Maximize" size={16} className="text-muted-foreground" />
              <div className="flex items-center gap-2 w-full">
                <input
                  type="number"
                  className="w-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  value={width}
                  onChange={e => setCustomW(Number(e.target.value) || 0)}
                  disabled={deviceId !== 'custom'}
                />
                <span className="text-muted-foreground">×</span>
                <input
                  type="number"
                  className="w-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  value={height}
                  onChange={e => setCustomH(Number(e.target.value) || 0)}
                  disabled={deviceId !== 'custom'}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Icon name="CornerDownRight" size={16} className="text-muted-foreground" />
              <input
                type="number"
                className="w-28 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={radius}
                onChange={e => setCustomR(Number(e.target.value) || 0)}
                disabled={deviceId !== 'custom'}
              />
              <span className="text-sm text-muted-foreground">corner radius</span>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex items-center justify-center py-6">
          <div className="shadow-elevation-2 rounded-2xl p-4 bg-gradient-to-br from-white to-gray-50 border border-border">
            <PhoneFrame width={width} height={height} radius={radius}>
              <iframe
                title="Live Preview"
                src={src}
                width={width}
                height={height}
                style={{ border: '0', display: 'block' }}
              />
            </PhoneFrame>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Tip: Use your OS screen recorder or OBS to record this page. You can change the route and device size above.
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
