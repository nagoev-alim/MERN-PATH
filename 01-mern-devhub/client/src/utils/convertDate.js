export default function getDate(date) {
  return new Date(date).toLocaleDateString().split(',')[0];
}
