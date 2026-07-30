import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Badge } from './Badge';

export function RiskBadge({ level }) {
  if (level === 'LOW RISK') {
    return (
      <Badge variant="success" className="flex items-center gap-1">
        <ShieldCheck size={14} />
        <span>Low Risk</span>
      </Badge>
    );
  }
  if (level === 'MEDIUM RISK') {
    return (
      <Badge variant="warning" className="flex items-center gap-1">
        <AlertTriangle size={14} />
        <span>Medium Risk</span>
      </Badge>
    );
  }
  return (
    <Badge variant="danger" className="flex items-center gap-1">
      <ShieldAlert size={14} />
      <span>High Risk</span>
    </Badge>
  );
}
