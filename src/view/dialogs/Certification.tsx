import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CertResData } from 'services/api';

export interface CertificationDialogProps extends DialogProps {
  certificate: CertResData;
}

export function CertificationDialog({
  open,
  onClose,
  certificate,
}: CertificationDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{certificate.standard_name}</DialogTitle>
    </Dialog>
  );
}