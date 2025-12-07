export const metadata = {
  title: 'Redirecting...',
  other: {
    'http-equiv': 'refresh',
    content: '0; url=/signin',
  },
};

export default function Home() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/signin" />
      <p>Redirecting to sign in...</p>
    </>
  );
}
