# INFO 340 Project

This repository contains demo-code for the draft of an interactive information web app called "Get To The Trail". It created for the _Client-Side Web Development_ course at the UW iSchool.

Currently it contains the all the main pages showing the basic layout of the homepage we envisioned.

The pages are:

1. "Home" shows the home page, a universal search bar and some user blog/experience about the trails they went to when scrolled down
2. "Trail" shows the information for each individual routes.  When clicking each individual trail the information of the trail will be show. We also envisioned that the user can update the status of the trail and the user can bookmark the trail.
3. "Shop" shows the possible options of hiking gear that the user can purchase.
3. "User" shows the user details such as name, address and their description. The page also shows their recent activities and friends they made on our website.


## App Content and HTML Structure
- [x] Project built using create-react-app in the root of the repo. Cleaned up extraneous files
- [x] Specified meta data in HTML (title, author, description, and own favicon)
- [x] Includes sufficient content (e.g., multiple views of the data)
- [x] Includes header element (with app name) and footer (with copyright) elements
- [x] Includes 3+ images or media content
- [x] Includes a form element


## React Components and Structure
- [x] App is broken up into a meaningful component hierarchy; each component reflects a "part" of the page
- [ ] Components are appropriately sized and scoped around data props
- [x] Components are defined as self-contained entities
- [x]  Data is passed through the app via props to components; props and state are appropriately distinguished.
- [x] Content is only rendered on through components—no DOM calls!

## React Interactivity
- [x] App has 2.5 interactive features.
 - Features involve new, project-specific code
- Features are complete user interactions
- Features are unified
- [x] Features are interactive and state-based.
- Features respond to different user inputs (one of which is a form)
- Interactions both read and write to state variables
- Interactions are visible in the page (not just console log); they change displayed content depending on user input
Features provide interaction via the event-state-render cycle.
- [ ] State information is stored at appropriate levels (in the "lowest common ancestor")
- Interaction is pleasant and frictionless:
- Interactions are discoverable (include instructions)
- Interactions provide feedback, including on errors—particularly for Firebase

## Client-Side Routing and Navigation

- [x] Correctly integrates react-router (specifying `<Route>`s, `<Link>`s, etc).
- [x]  Includes sufficient number of routes (3+).
- [x] includes 1 route with a path parameter.
- [x] Handles incorrect URLs and changes in access (e.g., login/logout) effectively.

## Integrates Another React Library

- [x]  Project imports another library (included in the `package.json` list of dependencies).
- [x] App `imports` external components.
- [x]  App renders imported components (they *do something*).
- [ ] App does not mix library and non-library versions of elements (e.g., mixing Bootstrap with `reactstrap`). ask

## Using External Data

- [x] App accesses external data using an event hook
- [x] Sends an AJAX request for external data file
- [x] Uses Promises to handle asynchronous data loading (`.then()`)
- [x] Catches and manages (e.g., displays) errors from data loading (`.catch()`
- [x]  Loaded data is used in some way
- [ ] Includes data source citation (if any)

## Site Style and CSS Structure

- [x] Loads an external CSS style sheet

- [x] Stylesheet includes sufficient number of rules (20+)

- [x] CSS changes:

   - colors
   - fonts/sizes
   - margins/padding

- [x] Uses flexbox or grid for non-standard layout (via Bootstrap is fine)

- [x] Has a polished appearance

   - readable & navigable
   - consistent
   - clean

- [x] CSS files and libraries are imported through JavaScript

## Accessibility
- [x] Uses elements semantically (no <i>; <a> for links, etc)
- [x] Correctly uses sectioning elements (<main>, <section>, etc); not needed if no sections
- [ ] Uses hierarchical headings; doesn't skip levels
- [ ] Includes alt attributes on all images
- [ ] Form includes <label> elements (with for attribute)
- [ ] Includes aria-label and role attributes when necessary (and only when necessary!)
- [ ] Colors have sufficient contrast

## Responsive Design
- [x] Specifies a viewport meta
- [ ] Includes media queries to handle 2+ sizes (at least small screens and large screens)  add one more
- [ ] Mobile-first CSS: media queries at the bottom (modify the small-size default)
- [ ] Styling changes on media and large screens
- [ ] Layout is noticeably and meaningfully different on different screen sizes
- [ ] Page content is polished on all screen sizes

## Clean Coding Style
- [ ] Organized files in repo
  Valid HTML
  - [ ] No invalid usage
  - [ ] No redundant elements
  - [ ] Clean and consistent indentation
  Well-designed CSS
  - [ ] Informative class names
  - [ ] Effective selectors (e.g., no id selectors)
  - [ ] No inappropriate duplication of rules
  - [ ] Organized in file, with comments to "group" sets of rules
  Well-written JavaScript
  - [ ] Informative variable and function names
  - [ ] Uses let and const instead of var
  - [ ] Functions avoid side effects (pure-ish)
  - [ ] Sensible variables and data types (especially arrays vs. objects)
  - [ ] Remove extraneous console.log calls
  - [ ] Correct and idiomatic usage of React framework
  - [ ] Uses well-scoped and informatively-named function components and hooks
  - [ ] Does not define functions (including inline .map()) inside of a return statement or inline expression!
  - [ ] Includes comments if and only if necessary for understanding the code.
  - [ ] Running app does not present any errors or warnings in the developer console.