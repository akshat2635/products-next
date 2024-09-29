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

/* 
Limitations of this app

The app shows all proucts and details on a single home page without utilizing routes
which can make the process of testing and scaling difficult

since the app is based wholly on external api rather than a backend connected to database,
the app can crash if api crashes 

we cant show the user valid keywords related to search query as done by google because
of lack of access of database of products.

*/

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
