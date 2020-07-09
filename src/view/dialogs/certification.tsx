import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CertResData } from 'services/api/certificate';

export interface CertificationDialogProps extends DialogProps {
  certificate: CertResData;
}

export const CertificationDialog = ({
  open,
  onClose,
  certificate,
}: CertificationDialogProps) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="certificate-dialog-title"
      open={open}
    >
      <DialogTitle id="certificate-dialog-title">
        {certificate.standard_name}
      </DialogTitle>
    </Dialog>
  );
};