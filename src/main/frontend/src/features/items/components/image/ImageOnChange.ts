export const imageOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const data = new FormData();
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      data.append("image", files[i]);
    }

    return data;
  }
};
