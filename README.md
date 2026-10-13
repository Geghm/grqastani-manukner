# Grqastani Manukner

# Build a Beautiful Armenian Educational Reading Platform — «Փոքրիկ ընթերցասերներ»

Act as a senior UI/UX designer, frontend developer, and educational product designer. Build a polished, responsive educational website called **«Փոքրիկ ընթերցասերներ» (Little Book Lovers)** for Armenian children in grades 3–4, approximately ages 8–10.

The website will be used by students and teachers in an Armenian school reading club. Its purpose is to encourage reading, comprehension, creative thinking, and learning through stories, quizzes, and cartoons.

## 1. Language and design

- The entire user interface must be in Armenian.
- Use a beautiful, playful, magical storybook-inspired visual identity.
- Combine warm colors, illustrated books, stars, clouds, friendly characters, and subtle animations with a clean, modern educational layout.
- Use readable Armenian fonts, large buttons, rounded cards, accessible contrast, and child-friendly icons.
- Make the website feel premium, engaging, safe, and appropriate for elementary school students.
- Ensure responsive layouts for desktop, laptops, tablets, and mobile phones.
- Use real Armenian UI text rather than placeholder English text.
- Avoid excessive animations and distracting visual effects.

## 2. Main website pages

Create the following pages with complete visual layouts and realistic sample content.

### Home page
- Attractive hero section with the title «Բարի գալուստ Գրքաստան».
- Subtitle inviting children to read, explore stories, and discover new adventures.
- Primary buttons: «Սկսել ընթերցանությունը», «Դիտել մուլտֆիլմերը».
- Featured stories, popular fairy tales, recently added content, and recommended activities.
- A friendly reading progress section.
- A section introducing the six learning categories.
- A footer with navigation, contact information placeholders, and school/club information.

### Reading library
Organize the library into six categories based on the «Փոքրիկ ընթերցասերներ» curriculum:

1. Բարի գալուստ Գրքաստան
2. Հեքիաթների մոգական աշխարհում
3. Առակների իմաստության դասերը
4. Մանկական գրականության գանձարանում
5. Փոքրիկ հեղինակների արվեստանոց
6. Տարվա գրական փառատոն

Each category must have its own page or dedicated section.

Create attractive story cards containing a cover image, title, short description, category, and reading button.

Include search, category filtering, and sorting.

### Story reading page
Create a comfortable reading interface with:
- Story title, author, cover illustration, and description.
- Readable Armenian text with adjustable font size.
- Previous/next navigation where appropriate.
- A «Անցնել հարցերին» button.
- A progress indicator.
- A related stories section.

### Comprehension quiz pages
Design a complete quiz interface that supports:
- Multiple-choice questions.
- Written answers.
- True/false questions.
- Image-based questions.
- Ordering story events.

Display one question at a time or group questions into clear sections. Include a progress indicator, answer selection states, a submit button, and a results screen.

The interface must accommodate questions and answer choices of varying lengths in Armenian.

### Cartoons and videos
Create a dedicated «Մուլտֆիլմերի աշխարհ» page.

Include:
- Searchable video cards.
- Video title, thumbnail, description, and category.
- Embedded video player layout.
- A prominent play button.
- Categories such as fairy tales, educational cartoons, Armenian stories, and fables.
- An interface for both uploaded videos and externally hosted videos.

YouTube videos must be displayed inside the website using an embedded player whenever embedding is permitted. Do not design a workflow that redirects children to YouTube as the normal viewing experience.

### Student area
Create a student identification or dashboard interface containing:
- Student name and surname.
- Class selection.
- Completed stories and quizzes.
- Scores and reading progress.
- Previously completed activities.
- Encouraging messages and achievement badges.

Design the interface so that it can support either name-and-class identification or individual student accounts.

### Administrator dashboard
Design a separate, professional admin panel, visually distinct from the children's interface but consistent with the overall branding.

Include the following sections:

1. **Dashboard overview**
   - Total students.
   - Total stories.
   - Total quizzes and questions.
   - Total cartoons.
   - Recent student activity.
   - Average scores and completion statistics.

2. **Story management**
   - Add a story.
   - Edit story details and content.
   - Delete a story.
   - Upload cover images.
   - Assign stories to categories.
   - Change publication status.

3. **Question management**
   - Create, edit, delete, and reorder questions.
   - Support all five question types.
   - Add answer choices and identify correct answers.
   - Assign questions to a story or category.
   - Set scores and question order.

4. **Category management**
   - Create new categories.
   - Rename, edit, reorder, and delete categories.
   - Assign stories, quizzes, and videos to categories.

5. **Cartoon management**
   - Upload video files from a computer.
   - Add YouTube URLs and other supported video URLs.
   - Enter titles, descriptions, thumbnails, and categories.
   - Preview videos before publishing.
   - Edit or delete videos.

6. **Student results**
   - View a list of students.
   - Search by name and surname.
   - Filter by class, story, quiz, and date.
   - Open individual submissions.
   - Review written answers.
   - View scores, correct and incorrect answers, and completion history.
   - Export results to CSV.

7. **Website settings**
   - Edit the homepage text.
   - Manage featured content.
   - Change selected visual settings.
   - Manage website categories and navigation.

## 3. Admin entry interface

Design an admin login modal that can be opened using the keyboard shortcut **Ctrl + Shift + A**.

The modal must contain:
- Email or username field.
- Password field.
- Show/hide password control.
- Login button.
- Clear error and loading states.

The shortcut is only a convenient way to open the login interface. It must not bypass authentication.

Hide the administrator dashboard from ordinary student navigation. All protected operations will be secured in the backend in a later development phase.

## 4. Technical implementation

Use a maintainable modern frontend architecture compatible with Lovable and subsequent development in Cursor.

Preferred stack:
- React.
- TypeScript.
- Tailwind CSS.
- Reusable UI components.
- React Router or an equivalent routing solution.
- Lucide icons.
- Supabase-compatible data and authentication architecture.

Create reusable components for:
- Navigation and footer.
- Story cards.
- Category cards.
- Video cards and player.
- Quiz questions.
- Student result summaries.
- Admin data tables.
- Forms, dialogs, and confirmation messages.

Create all major pages and navigation flows. Use realistic Armenian sample content for demonstration, but clearly distinguish sample data from real student records.

Prepare a clean project structure so that a developer can subsequently implement real database persistence, authentication, file storage, and permissions in Cursor.

Do not represent sample data or local browser state as a fully functioning cloud database.

## 5. Final deliverable

Build the actual website project, not merely a design mockup.

Make all navigation links, buttons, menus, modals, and frontend interactions work wherever possible. Ensure that all screens are responsive and visually consistent.

Prioritize excellent Armenian typography, a magical reading experience, a complete administrator dashboard UI, and a structure that can be extended without redesigning the site.

At the end, provide a summary of the implemented pages, components, dependencies, and any backend features that still need to be connected.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://grqastani-manukner.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a69781b4-393f-4808-9d62-acb2d2f226de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
