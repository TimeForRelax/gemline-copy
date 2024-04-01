import { Drawer, Modal } from '@mui/material';
import { useMediaType } from '@styles/index';
import { FC, ReactElement } from 'react';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
}

export const ResponsiveModal: FC<ResponsiveModalProps> = ({ isOpen, onClose, children }) => {
  const { phone } = useMediaType();

  if (phone) {
    return (
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            borderRadius: '20px 20px 0 0',
            backgroundColor: '#ffffff',
            pt: '14px',

            '&:before': {
              content: "''",
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '5px',
              borderRadius: '999px',
              backgroundColor: '#D8DDE2',
            },
          },
        }}
      >
        {children}
      </Drawer>
    );
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};
