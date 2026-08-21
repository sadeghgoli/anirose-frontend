import localFont from 'next/font/local'

export const peyda = localFont({
  src: [
    { path: '../public/fonts/PeydaWebFaNum-Thin.woff2', weight: '100' },
    { path: '../public/fonts/PeydaWebFaNum-ExtraLight.woff2', weight: '200' },
    { path: '../public/fonts/PeydaWebFaNum-Light.woff2', weight: '300' },
    { path: '../public/fonts/PeydaWebFaNum-Regular.woff2', weight: '400' },
    { path: '../public/fonts/PeydaWebFaNum-Medium.woff2', weight: '500' },
    { path: '../public/fonts/PeydaWebFaNum-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/PeydaWebFaNum-Bold.woff2', weight: '700' },
    { path: '../public/fonts/PeydaWebFaNum-ExtraBold.woff2', weight: '800' },
    { path: '../public/fonts/PeydaWebFaNum-Black.woff2', weight: '900' },
  ],
  variable: '--font-peyda',
  display: 'swap',
})

export const pinar = localFont({
  src: [
    { path: '../public/fonts/Pinar-FD-Light.woff2', weight: '300' },
    { path: '../public/fonts/Pinar-FD-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Pinar-FD-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Pinar-FD-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Pinar-FD-Bold.woff2', weight: '700' },
    { path: '../public/fonts/Pinar-FD-ExtraBold.woff2', weight: '800' },
    { path: '../public/fonts/Pinar-FD-Black.woff2', weight: '900' },
  ],
  variable: '--font-pinar',
  display: 'swap',
})