export const objectToFormData = (
  obj: Record<string, string | File>,
): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};
