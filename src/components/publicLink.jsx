export default function PublickLink({ url, title }) {
  return (
    <div>
      <a href={url}>{title} </a>
    </div>
  );
}
