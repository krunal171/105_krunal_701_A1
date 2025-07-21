const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const yauzl = require('yauzl'); // For unzipping
const mkdirp = require('mkdirp');


const mypath = './myfolder';
const zipname = 'my_archive.zip'; 
const outputZipPath = path.join(__dirname, zipname); 

async function createZipArchive(source, output) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(source)) {
            return reject(new Error(`Source folder does not exist: ${source}`));
        }

        // const archive = archiver('zip', {
        //     zlib: { level: 1 }
        // });

        const outputStream = fs.createWriteStream(output);

        outputStream.on('close', () => {
            console.log(`\nZip archive created successfully!`);
            console.log(`Output file: ${output}`);
            resolve();
        });
    });
}
async function main() {
    console.log(`Attempting to zip folder: ${mypath}`);
    try {
        await createZipArchive(mypath, outputZipPath);
        console.log('Zip creation process finished.');
    } catch (error) {
        console.error('Error creating zip archive:', error.message);
    }
}

main();

// ===========================================================================================================


// const fs = require('fs');
// const path = require('path');
// const yauzl = require('yauzl'); // For unzipping
// const mkdirp = require('mkdirp');
// // --- Function to unzip an archive ---
// async function unzipArchive(zipFilePath, destinationPath) {
//     return new Promise((resolve, reject) => {
//         console.log(`\nAttempting to unzip ${zipFilePath} to ${destinationPath}`);

//         // Check if the zip file exists
//         if (!fs.existsSync(zipFilePath)) {
//             return reject(new Error(`Zip file does not exist: ${zipFilePath}`));
//         }

//         yauzl.open(zipFilePath, { lazyEntries: true }, (err, zipfile) => {
//             if (err) {
//                 return reject(err);
//             }

//             zipfile.on('entry', (entry) => {
//                 const entryPath = path.join(destinationPath, entry.fileName);

//                 // If it's a directory (ends with '/'), create it
//                 if (/\/$/.test(entry.fileName)) {
//                     mkdirp(entryPath)
//                         .then(() => zipfile.readEntry())
//                         .catch(reject);
//                 } else {
//                     // If it's a file, ensure its parent directory exists and then extract
//                     mkdirp(path.dirname(entryPath))
//                         .then(() => {
//                             zipfile.openReadStream(entry, (err, readStream) => {
//                                 if (err) {
//                                     return reject(err);
//                                 }
//                                 const writeStream = fs.createWriteStream(entryPath);
//                                 readStream.pipe(writeStream);
//                                 writeStream.on('finish', () => zipfile.readEntry());
//                                 writeStream.on('error', reject);
//                             });
//                         })
//                         .catch(reject);
//                 }
//             });

//             zipfile.on('close', () => {
//                 console.log('Unzipping completed successfully!');
//                 resolve();
//             });

//             zipfile.on('error', reject);

//             zipfile.readEntry(); // Start reading entries
//         });
//     });
// }


// async function main() {
//   if (fs.existsSync(unzipDestinationPath)) {
//         console.log(`Removing existing unzipped folder: ${unzipDestinationPath}`);
//         fs.rmSync(unzipDestinationPath, { recursive: true, force: true });
//     }

//     try {
//         await unzipArchive(outputZipPath, unzipDestinationPath);
//         console.log('Unzip process finished.');
//     } catch (error) {
//         console.error('Error unzipping archive:', error.message);
//     }
// }

// main();