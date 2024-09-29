"use client";
import './globals.css';  // Import global styles
import { Inter } from 'next/font/google'; // Example of using a Next.js font
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Redux store
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Your App Title',
//   description: 'Your App Description',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}
