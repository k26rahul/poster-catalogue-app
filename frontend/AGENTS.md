# Data Architecture & Schemas

## Core Entities

This section outlines the definitions of the fundamental data objects used throughout the application.

### Poster Object

This object represents a specific extracted poster instance.

- pdfName (string): The name of the parent PDF this poster belongs to. Used to link the poster back to its source container.
- pageNo (integer): The specific page number in the original PDF document where this poster was found.
- index (integer): A running counter indicating the order of extraction within that specific PDF (e.g., the 1st, 2nd, or 10th poster found in that file).
- code (string): The extracted product code or text label found near the image.
- id (string): A unique composite string identifying this specific poster instance. Format: [pdfName]--i[index]--[code].
- imageFile (string): The filename of the generated JPEG image saved to the disk. It consists of the id plus a hash of the image bytes for uniqueness (e.g., ...--a1b2c.jpg).
- imageSize (array of 2 integers): Resolution of the image. Contains width and height integers.

### Category Object

This object represents the classification of the content.

- name (string): Unique display name (e.g., 'Radha Krishna').
- description (string): Localized description explaining the spiritual or aesthetic significance of the category.

### PDF Object

This object represents the source document and its aggregate data.

- path (string): The relative file path to the source PDF file (e.g., multi-per-page/01_Radha_Krishna.pdf).
- name (string): The filename stem without the extension. This acts as the unique identifier for the PDF file within the system (e.g., 01_Radha_Krishna).
- readableName (string): A human-friendly version of the name where underscores are replaced with spaces (e.g., 01 Radha Krishna).
- category (string): The category assigned to this PDF via the configuration registry (e.g., 'Radha Krishna', 'Modern', 'Nature').
- totalPosters (integer): The total count of valid posters extracted from this specific PDF.
- numLandscapePosters (integer): The count of landscape-oriented posters found in the PDF.
- numPortraitPosters (integer): The count of portrait-oriented posters found in the PDF.
- usedLandscapeForSample (boolean): Indicates whether the sample posters were selected from the landscape collection.
- posters (array): A list containing every single poster extracted from this PDF. This is populated only when generating the detailed JSON for a specific PDF.
- postersSample (array): A small subset (up to 5) of randomly selected posters. This is always populated.

## File Schemas

The application utilizes two primary file structures for metadata and detail views.

### Metadata File

- Type: Metadata File.
- Location: frontend\public\pdfs-data\metadata.json.
- Structure:
- pdfs: An array of PDF Objects (Summary View). The full posters list is kept empty, but postersSample is populated.
- categories: An array of Category Objects.

### PDF Detail File

- Type: PDF Detail File.
- Location: frontend\public\pdfs-data[pdfName].json.
- Structure:
- The root is a PDF Object (Detail View).
- Both the full posters list and postersSample are populated.

## Asset Directories

### Image Storage

- Location: frontend\public\poster-images.
- Content: Contains all generated JPEG images.
- Naming Convention: Matches the imageFile field in the Poster Object (e.g., 01_Radha_Krishna--i1--25284--a1b2c.jpg).
