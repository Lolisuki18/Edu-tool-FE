import Papa from 'papaparse';

export const transformUserCSV = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const transformedData = results.data.map((row: any) => ({
          username: (row['Username'] || row['username'] || '').toString().trim(),
          password: 'DefaultPassword123',
          email: (row['Email'] || row['email'] || '').toString().trim(),
          fullName: (row['Full Name'] || row['fullName'] || '').toString().trim(),
          role: (row['Role'] || row['role'] || 'STUDENT').toString().trim().toUpperCase(),
          status: (row['Status'] || row['status'] || 'ACTIVE').toString().trim().toUpperCase(),
        }));

        const csvString = Papa.unparse(transformedData);
        const newFile = new File([csvString], file.name, { type: 'text/csv' });
        resolve(newFile);
      },
      error: error => reject(error),
    });
  });
};
