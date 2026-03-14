import './globals.css';
import { NavigationProvider } from '@/context/NavigationContext';

export const metadata = {
  title: "Lasya's Derma Glo | Advanced Skin Health Clinic",
  description: 'Advanced, science-backed skin health care in Rajamahendravaram. Book your skin consultation today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
