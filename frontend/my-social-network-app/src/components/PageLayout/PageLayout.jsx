import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectNavPanel } from '../../store/app';

export function PageLayout({
  renderHeader,
  renderFooter,
  renderMain,
  children,
}) {
  const isOpen = useSelector(selectNavPanel);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        minHeight: '100vh ',
      }}
    >
      <Box component="header" sx={{ flex: !isOpen ? 0.5 : 1, height: 'auto', transition: '.4s all', }}>
        {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
      </Box>
      <Box
        component="main"
        sx={{ flex: !isOpen ? 6 : 7, height: 'auto', paddingBlock: '20px', transition: '.4s all', marginLeft: !isOpen ? '50px' : '110px', marginRight: !isOpen ? '25px' : '50px' }}
      >
        {renderMain ? renderMain() : children}
      </Box>
      <Box component="footer" sx={{background: 'blue', flex: !isOpen ? 1.5 : 1, height: 'auto', transition: '.4s all', maxWidth: !isOpen ? 200 : 150 }}>
        {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
      </Box>
    </Box>
  );
}