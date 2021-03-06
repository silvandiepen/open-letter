---
type: articles
isArchive: true
---

# Documentation

### Use

You can use **open letter** in any folder where there are markdown files. Open letter will automatically generate html pages out of all the markdown files, ready to deploy.

```bash
npx open-letter
```

### Settings

Open letter does not support any settings from the cli. Just to keep it as straightforward as possible.

But if you do want to change some things in your settings, of course you can.

You can alter a few settings in your files them self by adding meta data to your .md files.

###### Title

You can change the title of the file, which will be used in the title and menu by setting the title;

```
---
title: My Custom Title
---
```

###### Date

When adding a date, the date will be added to your file or can be used in the lists. When you want to create a blog with dated posts, the posts will be ordered by date and the date will be displayed. Make sure you use the DD-MM-YYYY format.

```
---
date: 2-12-2020
---
```

###### Hide

For instance a home file, you might not want to have in the menu's. In that case you can add the `hide: true` to your arguments and the file will be generated, but hidden from the menu.

```
---
hide: true
---
```

###### Project Settings

There are also a few project settings you can alter defining them in **any** of the markdown files.

```
---
projectTitle: My Project Title
projectLogo: media/my-logo.svg
projectIgnore: src, test
projectStyle: assets/my-css.css
projectStyleOverrule: assets/my-alt-css.css
---
```

**projectTitle** sets the title of the project, used everywhere in the title and as the logo when there is no logo defined.

**projectLogo** sets the logo image to be used in the header. If you don't have a file called "logo" but want to use another title, you can set it manually using the projectLogo

**projectIgnore**, sometimes there are folders you don't want to include in your project. If you have a separate docs folder or the markdown files in your source? You can add those folders here (comma separated, if multiple).

**projectStyle** defines another extra custom stylesheet. You add this stylesheet extra to your page.

**projectStyleOverrule** defines a new stylesheet and doesn't add the default stylesheet.

### Media and Assets

When you have a `media` or `assets` folder, these will automatically be copied to your project. In that way you can use the files placed in these folders in your open letter.

### Styling

Open letter automatically downloads the basic stylesheet from [stil](https://stil.style), if you want to add other stylesheet or add extra styling, you can use the settings.

###### Defining colors

You can add an extra stylesheet where you redefine the colors. An example file would/could look like this;

```
:root{
    --primary: red;
    --secondary: blue;
    --dark: #111111;
    --light: #999999;
}
```
