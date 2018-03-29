# Style Guideline Old School

* แนวทางการเขียน SCSS สำหรับการพัฒนา Web Application โดยมีเป้าหมายเพื่อให้เกิดการเขียน Code ไปในทิศทางเดียวกัน ช่วยเสริมให้การ Learning, Debug, Refactor, Review, Feedback ของทีมทำได้สะดวกและรวดเร็วขึ้น
* Guideline นี้จะมีลักษณะที่เขียน Style แยกออกมาเป็นไฟล์เดียวและ include เข้าไปที่ head โดยโปรเจคที่นำ Guideline นี้ไปใช้งาน ได้แก่ ASP.net, Magento, Symphony, Wordpress, Angular 1, None frontend framework เป็นต้น

## Table of contents
* [Syntax and Formatting](#syntax-and-formatting)
  - [Strings](#strings)
  - [Numbers](#numbers)
  - [Colors](#colors)
  - [Property sorting](#property-sorting)
  - [Selector nesting](#selector-nesting)
* [Naming conventions](#naming-conventions)
  - [Color](#color)
  - [Font](#font)
  - [Sizing and Spacing](#sizing-and-spacing)
  - [Component](#component)
  - [Image](#image)
* [Architecture](#architecture)
  - [css](#css)
  - [fonts](#fonts)
  - [images](#images)
  - [js](#js)
  - [scss](#scss)
  - [videos](#videos)
* [Responsive web design and Breakpoints](#responsive-web-design-and-breakpoints)
  - [Mobile portrait](#mobile-portrait)
  - [Mobile landscape](#mobile-landscape)
  - [Tablet](#tablet)
  - [Laptop](#laptop)
  - [Desktop](#desktop)
  - [@media Pattern](#media-pattern)
* [Typography](#typography)
  - [Anatomy](#typography-anatomy)
  - [Setting-up](#typography-setting-up)
  - [Usage](#typography-usage)
* [Collection](#collection)
  - [Example](#collection-example)
  - [Usage](#collection-usage)
* [Calibrate font](#calibrate-font)
  - [Setting-up](#calibrate-font-setting-up)
* [How to using other CSS framework in project](#how-to-using-other-css-framework-in-project)
  - [Setting-up](#vendor-setting-up)
* [How to overwrite javascript vendor style in project](#how-to-overwrite-javascript-vendor-style-in-project)
  - [Setting-up](#javascript-vendor-setting-up)
* [Git comment](#git-comment)
* [VSCode extensions and settings](#vscode-extensions-and-settings)
* [Start project by browser sync](#start-project-by-browser-sync)
* [CSS Processsor compile program](#css-processsor-compile-program)

## Syntax and Formatting
* ใช้ 2 spaces indents (ไม่ใช้ tabs)
* หลังชื่อ Selector และ Property ให้เว้น 1 space
* เขียน Property แบบเว้นบรรทัด
* เว้นช่องว่าง 1 บรรทัดสำหรับแต่ละ Selector
* เว้นช่องว่าง 1 บรรทัดสำหรับแต่ละ Nesting selector
```
// Good
.foo {
  display: block;
  overflow: hidden;
  padding: 0 10px;

  .bar {
    margin: 10px;
  }
}

.foobar {
  display: flex;
}

// Bad
.foo{
  display:block; overflow:hidden; padding:0 10px;
  .bar {
    margin: 10px;
  }
}
.foobar {
  display: flex;
}
```

### Strings
* ไม่ใช้ Single quotes กับ CSS values เช่น font name, number
```
$primary-font: sans-serif;
$primary-border-radius: 5px;

.foo {
  font-family: sans-serif;
}
```
* ใช้ Single quotes กับ String เช่น URLs
```
.foo {
  background-image: url('/images/logo.jpg');
}
```

### Numbers
* ตัวเลขที่มีค่าเป็น 0 ไม่ต้องใส่ unit ต่อท้าย
```
.foo {
  padding: 0 10px;
}
```
* ต้องมีตัวเลขนำหน้าจุดทศนิยมเสมอ
```
.foo {
  transition: all 0.5s ease 1.5s;
}
```

### Colors
* Solid color ใช้ HEX format โดยใช้ตัวอักษรเป็น Uppercase
```
.foo {
  color: #FFFFFF;
}
```
* Opacity color ใช้ RGBA format
```
.foo {
  background-color: rgba(255, 255, 255, 0.5);
}
```

### Property sorting
* ลำดับการเขียน CSS Properties โดยแบ่งตาม Category
* ไม่ควรใส่ CSS Properties ของ Font, Text ลง Element หรือ Component ที่มีลักษณะเป็น Container โดยตรง
```
.component {
  // Mixins
  @include sampleMixin();
  @include sampleTransition();
  @include sampleTransform();
  @include sampleAnimation();

  // Helpers
  @extend .smaple-helper;

  // Animation
  // this group properties can use mixins instead pure properties
  transition: all 0.3s $animation-timing-elastic;
  transform: translateX(15px);

  // Visual formatting (display, positioning)
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: block;

  // Box Size (dimensions)
  width: 50%;
  height: auto;

  // Margin & Padding
  padding: 30px;
  margin: auto;

  // Background
  background-color: $color-white;

  // Border
  border: 1px solid $color-gray-1;

  // Box shadow
  box-shadow: $box-shadow-1;

  // Font, Text
  .text-element {
    font-weight: normal;
    vertical-align: middle;
    text-transform: none;
    font-family: $fontFamilyPrimaryRegular;
    font-size: $fontSizePrimaryBodyXs;
    line-height: $lineHeightsPrimaryBody;
    letter-spacing: $letterSpacingPrimaryBody;
  }
}
```

### Selector nesting
* ลำดับการเขียน Selector ภายใน Element หรือ Component แบ่งส่วนประกอบเป็น 8 ส่วน ได้แก่
  * Mixins
  * Helpers
  * Parent styles: CSS Properties ของ Component
  * Child element styles: Elements ที่อยู่ใน Component
  * States: Class ที่ใช้เปลี่ยนแปลงลักษณะและสื่อความหมายของ Component เช่น success, error, warning, disabled มักถูกใช้ใน Form validation, Notification
  * Modifiers: Class ที่ใช้เปลี่ยนแปลงลักษณะของ Component เช่น สี/ขนาด/ตำแหน่ง ต่างๆ ซึ่งอาจจะสื่อความหมายหรือไม่ก็ได้
  * States with modifiers: Modifier ที่มีการเปลี่ยนแปลง CSS Properties ภายใต้ States
  * Media query: Breakpoint สำหรับ Styles ในหน้าจอขนาดต่างๆ
* เขียน Nesting ซ้อนไม่เกิน 3 ชั้น (แต่ในงานจริงๆ เราจะเจอการใช้ Selector ที่มีการซ้อนมากกว่า 3 ชั้น ก็จะอนุโลมให้ในกรณี Class นั้นซ้อนอยู่ใน State, Modifier class, Media query)
```
.button {
  // Mixins
  // >>>>>>>>>>>>>>>>>>>>>>>
  @include transition(all 0.5s ease);

  // Helpers
  // >>>>>>>>>>>>>>>>>>>>>>>
  @extend .foo-helper;

  // Parent styles
  // >>>>>>>>>>>>>>>>>>>>>>>
  display: inline-block;
  min-width: $button-min-width;
  height: 36px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: $color-gray-1;

  // Child element styles
  // >>>>>>>>>>>>>>>>>>>>>>>
  .button-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-icon {
    display: inline-block;
  }

  .button-text {
    @extend .text-body-primary-xs;

    &.is-size-md {
      font-size: $font-size-body-md;
    }
  }

  // States
  // >>>>>>>>>>>>>>>>>>>>>>>
  &.is-disabled {
    pointer-events: none;
    background-color: $color-gray-2;
  }

  // Modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>
  &.is-primary {
    background-color: $color-yellow-1;
  }

  &.is-size-lg {
    height: 48px;
  }

  // States with modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>
  &.is-disabled {
    &.is-primary {
      background-color: $color-gray-2;
    }
  }

  // Media queries
  // >>>>>>>>>>>>>>>>>>>>>>>
  @media (min-width: 1024px) {
    min-width: auto;
  }
}

// Browser variations
// >>>>>>>>>>>>>>>>>>>>>>>
// IE 10-11
.ie {
  .button {
    min-width: auto;
    height: auto;
  }
}

// Edge
.edge {}

// Safari mac
.safari {}

// Firefox
.firefox {}

// Safari iPhone/iPad
.safari-mobile {}

// Chrome Android
.chrome-mobile {}
```
* ต้องมี Comment ของแต่ละลำดับส่วนไว้เพื่อให้ง่ายต่อการไล่ดู Code
* Comment ของแต่ละลำดับส่วนให้มีเฉพาะ Parent selector เท่านั้น เพราะ ถ้า Child selector มีด้วยจะดูสับสนเกินไป
* Comment format
```
.foo {
  // Mixins
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Helpers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Parent styles
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Child element styles
  // >>>>>>>>>>>>>>>>>>>>>>>

  // States
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // States with modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Media queries
  // >>>>>>>>>>>>>>>>>>>>>>>
}

// Browser variations
// >>>>>>>>>>>>>>>>>>>>>>>
// IE 10-11
.ie {}

// Edge
.edge {}

// Safari mac
.safari {}

// Firefox
.firefox {}

// Safari iPhone/iPad
.safari-mobile {}

// Chrome Android
.chrome-mobile {}
```

## Naming conventions
* Selectors, Variables, Mixins, Functions ให้ตั้งชื่อด้วย Lowercase คั่นระหว่างคำด้วย Hyphen
```
.small-text {
  font-size: 11px;
}

$primary-color: #000000;

@mixin translate($x, $y) {
  transform: translate($x, $y);
}

@function device-screens($layer) {
  @return map-get($screen-maps, $layer);
}
```
* หลีกเลี่ยงการตั้งชื่อที่ Specific เกินไป โดยมีกรณีศึกษา เช่น
  * ไม่สามารถโยกย้ายไปใช้ในส่วนอื่นๆ ของเว็บไซต์ได้
  * เมื่อต้องการเปลี่ยนแปลงค่าในกรณี Responsive จะเกิดความขัดกันเองระหว่างชื่อและค่าที่เปลี่ยนไป
```
// ใช้ได้แค่ที่หน้า about
.about-title {...}

// ไม่ทราบว่า 5 ใช้หน่วยอะไร %, px, em, rem
.margin-5 {...}
```

### Color
* ความอ่อนเข้มของสีให้ใช้การไล่ลำดับของตัวเลข โดยเลขน้อย = อ่อน และเลขมาก = เข้ม
* กรณีหลังจากสร้าง Variables โดยไล่ความอ่อนเข้มของสีเสร็จแล้ว แล้วมีสีเพิ่มเติมมาแทรกทีหลัง ให้เพิ่ม Suffix คือ sp (Special) ไปที่หลังชื่อสีและไล่เลขไปตามเดิมโดยไม่ต้องสนความอ่อนเข้ม และเมื่อมีเวลาให้มาทำการ Refactor โดยการไล่ลำดับให้ถูกต้อง
```
// Before refactor
$color-gray-1: #999999;
$color-gray-2: #666666;
$color-gray-3: #333333;
$color-gray-4: #000000;

// เพิ่มเข้ามาทีหลัง
$color-gray-sp-1: #111111;
$color-gray-sp-2: #CCCCCC;

// After refactor
$color-gray-1: #CCCCCC;
$color-gray-2: #999999;
$color-gray-3: #666666;
$color-gray-4: #333333;
$color-gray-5: #111111;
$color-gray-6: #000000;
```

### Font
* การตั้งชื่อไฟล์ให้ใช้ lowercase ขึ้นต้นด้วยชื่อ font คั่นแต่ละคำด้วย hyphen และตามด้วย weight เช่น db-helvethaica-x-regular.ttf
* การตั้งชื่อ font-family ที่ @font-face ให้ตั้งชื่อตามไฟล์ font ที่อยู่ภายในเครื่อง แต่ไม่ต้องเว้นวรรคคำและคั่น weight ด้วย hyphen เช่น DBHelvithaicaX-Regular
  * Windows > Control Panel > Fonts

### Sizing and Spacing
* ขนาดและระยะห่างให้ใช้ตัวย่อแทนชื่อเต็ม
```
.grids {
  // Mini
  &.is-mn {...}

  // Tiny
  &.is-tn {...}

  // Extra extra small
  &.is-xxs {...}

  // Extra small
  &.is-xs {...}

  // Small
  &.is-sm {...}

  // Middle
  &.is-md {...}

  // Large
  &.is-lg {...}

  // Extra large
  &.is-xl {...}

  // Extra extra large
  &.is-xxl {...}

  // Big
  &.is-bg {...}

  // Huge
  &.is-hg {...}

  // Massive
  &.is-ms {...}
}
```

### Component
* Component name
```
.name-extendedName {}
```
โครงสร้างชื่อ ประกอบด้วย
1. name: ชื่อที่ตั้งขึ้นให้สอดคล้องกับหน้าตาและหน้าที่ของ Component
2. extendedName: ชื่อที่ใช้เพื่อขยายความหมายของหน้าตาและหน้าที่
```
.card-primary {}
.container-vertical-middle {}
```

* Child component name
```
.componentName-childComponentName-extendedName {...}
```
โครงสร้างชื่อ ประกอบด้วย
1. componentName: ชื่อของ Component (ไม่รวม childComponentName)
2. childComponentName: ชื่อของ Child ใน Component
3. extendedName: ชื่อที่ใช้เพื่อขยายความหมายของหน้าตาและหน้าที่
```
.card-primary {
  .card-outer {...}

  .card-inner {...}

  .card-button {...}

  .card-meta {
    .card-meta-image {...}
    .card-meta-title {...}
    .card-meta-description {...}
  }
}

.container-vertical-middle {
  .container-inner {...}
}
```

* State & Modifier name
  * State ใช้กับสิ่งที่มีลักษณะเป็นสถานะของ Component เช่น Form validation, Notification
  * Modifier ใช้กับสิ่งที่มีลักษณะเป็นรูปลักษณ์ของ Component โดยมีวัตถุประสงค์เพื่อเปลี่ยนแปลงรูปลักษณ์เดิม เช่น Button สี/ขนาด/ตำแหน่ง ต่างๆ
```
.name-extendedName {
  &.prefixName-stateName {...}

  &.prefixName-modifierName {...}
}
```
โครงสร้างชื่อ ประกอบด้วย
1. prefixName: คำนำหน้าเพื่อระบุว่าใช้ใน Scope ของ Component นี้เท่านั้น เช่น is, has เป็นต้น
2. stateName/modifierName: ชื่อ State/Modifier ของ Component ใช้เพื่อระบุว่าอยู่ในสถานะอะไร หรือใช้กับสิ่งใด
```
.message-notification {
    &.is-success {...}

    &.is-error {...}

    &.is-disable {...}

    &.is-top-left {...}

    &.is-lg {...}

    &.has-icon {...}

    &.has-button {...}
}
```

### Image
```
// contents
.pageName-extendedName

// favicons, icons, logos, shares
.roleName-extendedName

// images with density
.roleName-extendedName@densityUnit
```

โครงสร้างชื่อ ประกอบด้วย
  * pageName: ชื่อหน้าเว็บไซต์ที่นำรูปไปใช้
  * roleName: ชื่อโฟลเดอร์ หรือ ชื่อที่อธิบายถึงสิ่งนั้นๆ (อนุญาตให้ใช้ชื่อย่อได้ ถ้าชื่อนั้นเป็นชื่อที่ทุกคนอ่านแล้วเข้าใจ เช่น background > bg, icon > ic)
  * densityUnit: ชื่อย่อที่แสดงถึงขนาดรูป เช่น 2x, 3x, xs, md, lg (ในกรณี 1x และ svg ไม่ต้องมี density กำกับ)
  * extendedName: ชื่อที่ใช้เพื่อขยายความหมายของหน้าตาและหน้าที่

```
// contents
home-banner.jpg
home-cover-page.jpg

// favicons
favicon.ico

// icons
icon-interface-close-line.svg
icon-social-facebook-square.png

// logos
logo-react.svg

// shares
bg-gradient-noise-blue.jpg
ribbon-awwwards-honors-green-left.png

// images with density
favicon@xs.png
icon-social-facebook-square@2x.png
```

## Architecture
* โครงสร้างของ Style assets แบ่งออกเป็น 5 ส่วน ได้แก่
  * css
  * documents
  * fonts
  * images
  * js
  * scss
  * videos

### css
* เก็บไฟล์ CSS ที่เขียนขึ้นมาเอง และไฟล์ CSS ที่ไม่สามารถติดตั้งผ่านทาง Package manager eg. npm, yarn ได้(ต้องดาวน์โหลดมาติดตั้งเอง)

### documents
* เก็บไฟล์เอกสาร เช่น PDF, Microsoft Word/Excel/Powerpoint เป็นต้น เพื่อใช้สำหรับดาวน์โหลด

### fonts
* เก็บไฟล์ font ที่นำมาใช้ในเว็บไซต์ โดยภายในแบ่งเป็น folder ตาม font family
* หลักเลี่ยงการใช้ font-weight: bold ถ้า font ที่นำมาใชัมี weight bold อยู่แล้ว เนื่องจาก font-weight: bold เป็นการทำให้ font หนาขึ้นโดย CSS ซึ่งไม่ได้เป็นความหนาที่มาจากการออกแบบ font

### images
* เก็บไฟล์ image ที่นำมาใช้ในเว็บไซต์ โดยภายในแบ่งเป็น folder ออกเป็น
  * contents: เก็บ Content image, Banner (เป็นรูปที่ภายหลัง User จะเป็นคนใส่เองจาก CMS)
  * favicons: เก็บ Favicon
  * icons: เก็บ Icon
  * logos: เก็บ Logo
  * shares: เก็บ Background, Graphic (เป็นรูปที่เกี่ยวข้องกับ Layout และ Design ที่สามารถหยิบไปใช้ได้ทุกที่)

### js
* เก็บไฟล์ javascript ที่เขียนขึ้นมาเอง และไฟล์ javascript ที่เป็น Library/Plugin ต่างๆ เช่น jQuery, Carousel, Lightbox

### scss
* โครงสร้างของ scss แบ่งออกเป็น 6 ส่วน ได้แก่
  * bases: เก็บไฟล์สไตล์ตั้งต้นของโปรเจค ประกอบด้วย
    - reset: รีเซต CSS Properties ตั้งต้นของ HTML tags เพื่อให้ Browser ต่างๆ ใช้ค่าตั้งต้นเดียวกัน
    - scaffolding: ตั้งค่า CSS Properties ตั้งต้นของ HTML tags ใหม่สำหรับโปรเจค
    - typography: Embed font family และเก็บ font style ของโปรเจค
    - variables: ตั้งค่าตัวแปรที่ใช้กับ Style ในโปรเจค เช่น Colors, Font families
  * collections: เก็บไฟล์สไตล์ Collections(Complex component) ของโปรเจค เช่น Card
  * components: เก็บไฟล์สไตล์ Component ของโปรเจค เช่น Button, Dropdown
  * helpers: เก็บไฟล์สไตล์ที่สามารถใช้ข้ามโปรเจคได้ โดยไฟล์ในโฟลเดอร์นี้จะไม่ถูก compiled ออกมาเป็น CSS (ยกเว้น utilities)
    - mixins: เก็บ CSS ที่เป็น group properties ที่สามารถเปลี่ยนแปลงค่าได้และใช้งานเป็นประจำ
    - utilities: เก็บ CSS ที่เป็น single property หรือ group properties ที่ไม่สามารถเปลี่ยนแปลงค่าได้และใช้งานเป็นประจำ
  * layouts: เก็บไฟล์สไตล์โครงสร้างหลักของเว็บไซต์ เช่น topbar, sidebar และ footer เป็นต้น (ไม่มีการ reuse ใช้หลายที่ๆ เหมือน Components แต่เป็นการใช้ร่วมกันในแต่ละหน้า)
    - สร้าง Parent class เป็นชื่อโครงสร้างหลักนั้นๆ เช่น
    ```
    .topbar {...}

    .sidebar {...}

    .footer {...}
    ```
  * pages: เก็บไฟล์สไตล์ที่มีเฉพาะหน้าเว็บไซต์นั้นๆ เท่านั้น โดยสไตล์เหล่านี้จะนำไปใช้ในหน้าอื่นๆ ไม่ได้
    - สร้าง Parent class เป็นชื่อหน้าเว็บไซต์นั้นๆ เช่น home, about, contact
    ```
    .home {...}

    .about {...}

    .contact {...}
    ```
  * vendors: เก็บไฟล์สไตล์ของ CSS Framework ที่นำมาใช้แค่บางส่วน ดูรายละเอียดเพิ่มเติมที่ [How to using other CSS framework in project](#how-to-using-other-css-framework-in-project)
    - สร้าง Parent class เป็นชื่อ CSS Framework นั้นๆ เช่น
    ```
    .bootstrap {...}

    .semantic-ui {...}

    .bulma {...}
    ```
  * main: ไฟล์รวมสไตล์ทั้งหมดสำหรับ Compile มาเป็น main.css เพื่อนำไปใช้ในเว็บไซต์

### videos
* เก็บไฟล์ videos เช่น mp4 เป็นต้น

## Responsive web design and Breakpoints
* แบ่ง Breakpoints เป็นช่วงตามประเภท Devices โดยการแบ่งช่วงของ Mobile/Tablet อ้างอิง Devices ของ Apple/Sumsung เป็นหลักและ Laptop/Desktop อ้างอิง Monitor statistics แต่ละปีเป็นหลัก

### Mobile portrait
* 320 px > iPhone 5, 5s
* 360 px > Sumsung(Middle tier)
* 375 px > iPhone 6, 7, 8, X
* 414 px > iPhone 6s, 7s, 8s

### Mobile landscape
* 480 px > iPhone 5
* 640 px > Sumsung(Middle tier)
* 667 px > iPhone 6, 7, 8
* 736 px > iPhone 6s, 7s, 8s
* 812 px > iPhone X

### Tablet
* 768 px > iPad, iPad mini/Air
* 800 px > Samsung Galaxy Tab
* 1024 px > iPad, iPad mini/Air landscape

### Laptop
* 1280 px > Samsung Galaxy Tab landscape, MDPI Screen
* 1366 px > iPad Pro landscape
* 1440 px > Microsoft Surface Pro, HiDPI Screen

### Desktop
* 1600 px > Wide Screen
* 1920 px > HD Screen
* 2560 px > iMac

### @media Pattern
* ถ้า @media มีตั้งแต่ 2 ค่าขึ้นไป ให้เคาะบรรทัดตั้งแต่ค่าที่ 2 ลงมา
```
// Min width
@media (min-width: $breakpoint-mobile-lg) {
  ...
}

// Max width
@media (max-width: $breakpoint-tablet-lg) {
  ...
}

// Min-Max width
@media (min-width: $breakpoint-mobile-lg)
  and (max-width: $breakpoint-tablet-lg) {
  ...
}

// Min-Max width & Portrait orientation
@media (min-width: $breakpoint-tablet-sm)
  and (max-width: $breakpoint-tablet-lg)
  and (orientation: portrait) {
  ...
}

// Min-Max width & Landscape orientation
@media (min-width: $breakpoint-tablet-sm)
  and (max-width: $breakpoint-tablet-lg)
  and (orientation: landscape) {
  ...
}
```
* การทำ Responsive style ให้กับ Class selector มีรูปแบบ ดังนี้
  - เขียนใน Scope ของแต่ละ Class selector ถึงจะเยอะ แต่ไล่จัดการได้ง่ายกว่าการเขียนแบบ Parent ครอบไว้ เพราะทุก Breakpoints อยู่ใน Scope ของ Class selector นั้นๆ ไม่กระจัดกระจายไปตาม Breakpoints ที่เป็นแบบ Parent
```
.foo {
  // Mixins
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Helpers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Parent styles
  // >>>>>>>>>>>>>>>>>>>>>>>
  color: $color-gray-1;

  // Child element styles
  // >>>>>>>>>>>>>>>>>>>>>>>
  .foo-bar {
    background-color: $color-blue-1;

    .foo-bar-ha {
      border-color: $color-red-1;
    }
  }

  // States
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // States with modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Media queries
  // >>>>>>>>>>>>>>>>>>>>>>>
  // Good
  @media (min-width: $breakpoint-mobile-lg) {
    color: $color-gray-2;
  }

  @media (max-width: $breakpoint-tablet-lg) {
    background-color: $color-gray-3;
  }

  .foo-bar {
    @media (max-width: $breakpoint-mobile-lg) {
      background-color: $color-blue-2;
    }

    @media (max-width: $breakpoint-tablet-lg) {
      background-color: $color-blue-3;
    }

    .foo-bar-ha {
      @media (min-width: $breakpoint-mobile-lg)
      and (max-width: $breakpoint-tablet-lg) {
        border-color: $color-red-2;
      }
    }
  }

  // Bad
  @media (min-width: $breakpoint-mobile-lg) {
    color: $color-gray-2;

    .foo-bar {
      background-color: $color-blue-2;
    }
  }

  @media (min-width: $breakpoint-mobile-lg) {
    color: $color-gray-3;

    .foo-bar {
      background-color: $color-blue-3;
    }
  }

  @media (min-width: $breakpoint-mobile-lg) and (max-width: $breakpoint-tablet-lg) {
    .foo-bar {
      .foo-bar-ha {
        border-color: $color-red-2;
      }
    }
  }
}
```

## Typography
* หลีกเลี่ยงการเขียน Font/Text (CSS properties) ใน Class selector ที่เป็น Container เนื่องจากต้องการความเป็น Scope/Local และ Semantic ของ Class selecctor ที่มากขึ้น (CSS properties ของ Parent class ควรแสดงผลกับตัวมันเองเท่านั้น ไม่ควรส่งผลต่อ Child class)
* นำ Typography ออกมาจาก Container โดยแยกเขียนเป็น Class selector ออกมาต่างหาก

### Typography Anatomy
1. Family-Weight: หน้าตาของตัวอักษร(ชื่อและความหนา)
    * ความหนาของตัวอักษร เช่น Light, Regular, Bold, Black เป็นความหนาของตัว Font เองไม่ใช่ความหนาที่เกิดจาก CSS property
    * ในกรณีไม่ได้ Embed font ใส่ในโปรเจค แต่ใช้ Google Font วิธีการให้ได้มาซึ่ง Font weight ต่างๆ จะใช้การอ้างอิง font-weight ที่เป็นตัวเลข เช่น
      - Roboto regular  > font-weight: 400
      - Roboto medium   > font-weight: 500
2. Size: ขนาดของตัวอักษร
3. Line height: ระยะห่างแนวตั้งระหว่างบรรทัดของ Text โดยมีค่าเท่ากับ Font size + Space above and below of text
![Line height](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/typography-line-height.png)
    * References: http://smad.jmu.edu/shen/webtype/index.html
4. Letter spacing: ระยะห่างแนวนอนของแต่ละตัวอักษร

### Typography Setting-up
1. แปลงไฟล์
    * นำไฟล์ ttf หรือ otf ไปแปลงเป็น Web fonts ที่ https://www.fontsquirrel.com/tools/webfont-generator และตั้งค่า ดังนี้
      - เลือก Expert
      - เลือก Font formats: TrueType, WOFF และ EOT Lite
      - เลือก Subsetting: No Subsetting
      - Font Name Suffix ใส่เป็นค่าว่าง
2. @font-face: Embed font เข้ามาใน CSS
```
@font-face {
    font-family: Maitree-Medium;
    src: url('#{$path-file-fonts}/maitree/maitree-medium.eot');
    src: url('#{$path-file-fonts}/maitree/maitree-medium.eot') format('embedded-opentype'),
        url('#{$path-file-fonts}/maitree/maitree-medium.woff') format('woff'),
        url('#{$path-file-fonts}/maitree/maitree-medium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
```
3. @mixin: สร้าง Base component โดยใช้ Mixin
    * ไม่มี Parameter ที่เป็น Color เพราะ ต้องการให้สอดคล้องกับ Typography anatomy
```
@mixin text-variant(
  $text-display: inline-block,
  $text-font-family: initial,
  $text-font-size: initial,
  $text-line-height: initial,
  $text-letter-spacing: normal
) {
  // Mixins
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Helpers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Parent styles
  // >>>>>>>>>>>>>>>>>>>>>>>
  display: $text-display;
  font-family: $text-font-family;
  font-size: $text-font-size;
  font-weight: normal;
  line-height: $text-line-height;
  letter-spacing: $text-letter-spacing;
  vertical-align: middle;
  text-transform: none;

  // Child element styles
  // >>>>>>>>>>>>>>>>>>>>>>>

  // States
  // >>>>>>>>>>>>>>>>>>>>>>>
  &:hover,
  &:focus {
      text-decoration: none;
  }

  // Modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // States with modifiers
  // >>>>>>>>>>>>>>>>>>>>>>>

  // Media queries
  // >>>>>>>>>>>>>>>>>>>>>>>
}
```
4. สร้าง Text style class
    * Text style แบ่งออกเป็น 2 รูปแบบ คือ
        - Text body
        - Text heading
    * Text style แต่ละรูปแบบจะสร้าง Class โดยอิงตามขนาดของ Font size เช่น
        - .text-primary-body-xs
        - .text-primary-heading-xs
        - การตั้งชื่อ extendedName ของ Class จะไม่ใช้ชื่อ Font โดยตรงแต่จะใช้ชื่อ primary, secondary, tertiary แทนเพื่อหลีกเลียงกรณีเว็บไซต์มีหลายภาษา และแต่ละภาษาใช้ Font คนละแบบ
    * Text style ถ้ามีหลาย Weight จะสร้าง class โดยอิงตาม Weight เช่น
        - .text-primary-body-xs-bold
        - .text-primary-heading-xs-bold
```
.text-primary {
  // Body
  &-body {
    // Extra small
    // Class name: .text-primary-body-xs
    &-xs {
      @include text-variant(
        $text-display: inline-block,
        $text-font-family: $font-family-primary-medium,
        $text-font-size: $font-size-primary-body-xs,
        $text-line-height: $line-height-primary-body,
        $text-color: $letter-spacing-primary-body
      );

      &-bold {
        @include text-variant(
          $text-display: inline-block,
          $text-font-family: $font-family-primary-bold,
          $text-font-size: $font-size-primary-body-xs,
          $text-line-height: $line-height-primary-body,
          $text-letter-spacing: $letter-spacing-primary-body
        );
      }
    }

    // Small
    // Class name: .text-primary-body-sm
    &-sm {
      @include text-variant(
        $text-display: inline-block,
        $text-font-family: $font-family-primary-medium,
        $text-font-size: $font-size-primary-body-sm,
        $text-line-height: $line-height-primary-body,
        $text-color: $letter-spacing-primary-body
      );

      &-bold {
        @include text-variant(
          $text-display: inline-block,
          $text-font-family: $font-family-primary-bold,
          $text-font-size: $font-size-primary-body-sm,
          $text-line-height: $line-height-primary-body,
          $text-letter-spacing: $letter-spacing-primary-body
        );
      }
    }
  }

  // Heading
  &-heading {
    // Extra small
    // Class name: .text-primary-heading-xs
    &-xs {
      @include text-variant(
        $text-display: inline-block,
        $text-font-family: $font-family-primary-medium,
        $text-font-size: $font-size-primary-heading-xs,
        $text-line-height: $line-height-primary-heading,
        $text-color: $letter-spacing-primary-heading
      );

      &-bold {
        @include text-variant(
          $text-display: inline-block,
          $text-font-family: $font-family-primary-bold,
          $text-font-size: $font-size-primary-heading-xs,
          $text-line-height: $line-height-primary-heading,
          $text-letter-spacing: $letter-spacing-primary-heading
        );
      }
    }

    // Small
    // Class name: .text-primary-heading-sm
    &-sm {
      @include text-variant(
        $text-display: inline-block,
        $text-font-family: $font-family-primary-medium,
        $text-font-size: $font-size-primary-heading-sm,
        $text-line-height: $line-height-primary-heading,
        $text-color: $letter-spacing-primary-heading
      );

      &-bold {
        @include text-variant(
          $text-display: inline-block,
          $text-font-family: $font-family-primary-bold,
          $text-font-size: $font-size-primary-heading-sm,
          $text-line-height: $line-height-primary-heading,
          $text-letter-spacing: $letter-spacing-primary-heading
        );
      }
    }
  }
}
```
5. สร้าง Text style variables
    * เก็บ Text style class ไว้เป็น variable เพื่อในอนาคตอาจจะมีการเปลี่ยนแปลงใดๆ เราก็จะสามารถแทนที่ค่าใหม่ลงไปที่ variable นั้นๆ ได้เลย(Config ที่เดียว)
```
// Primary body
$text-style-primary-body-xs: '.text-primary-body-xs' !default;
$text-style-primary-body-sm: '.text-primary-body-sm' !default;

// Primary Heading
$text-style-primary-heading-xs: '.text-primary-heading-xs' !default;
$text-style-primary-heading-sm: '.text-primary-heading-sm' !default;
```

### Typography Usage
* ที่ Class selector ให้ใช้ @extend และตามด้วย Text style variable
* เนื่องจากมีการส่งผ่าน Variable ไปที่ @extend จึงต้องใช้ #{...} ครอบไว้เพื่อบอกว่าไม่ใช่ String
```
.foo {
  @extend #{$text-style-primary-body-xs};
  color: $color-white-1;
}
```

## Component
* Component เป็นสิ่งที่มีลักษณะคล้าย LEGO มีรูปร่างหลายแบบ โดยเมื่อนำแต่ละแบบมาประกอบเข้าด้วยกันก็จะเกิดเป็นชิ้นงาน
* Component แต่ละแบบเมื่อนำมาประกอบเข้าด้วยกันก็จะเกิดเป็นโครงสร้าง และเมื่อนำโครงสร้างต่างๆ มาประกอบเข้าด้วยกันตามดีไซน์ก็จะเกิดเป็น Website
* ข้อดีของ Component คือ มีลักษณะเป็นชิ้นๆ และแต่ละแบบจะไม่มีความเกี่ยวข้องกัน ดังนั้นเมื่อมีการปรับแก้ไข/เพิ่มเติมโครงสร้าง เราไม่จำเป็นต้องรื้อโครงสร้างทั้งหมดใหม่ตั้งแต่ต้น แต่เราสามารถแก้ไข/เพิ่มเติมเฉพาะส่วนเท่านั้นได้ ทำให้สามารถเข้าถึงปัญหาและประหยัดเวลาในการแก้ไข/เพิ่มเติมได้อย่างมีประสิทธิภาพมากขึ้น

### Component Anatomy
* Structure
  - โครงสร้างพื้นฐาน ที่เมื่อกำหนดค่า CSS Properties ต่างๆ เข้าไป จะแสดงรูปร่างออกมา
  - การวิเคราะห์โครงสร้างไม่ได้มีหลักการตายตัว โดยพื้นฐานให้ใช้การสังเกตความสัมพันธ์ระหว่าง UI กับ CSS Properties แล้วทำการลิสต์ออกมา
  - ตัวอย่างโครงสร้าง Button

  ![Button structure](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/button-structure.png)

  จะประกอบด้วย CSS Properties ดังนี้
    - display
    - min-width
    - height
    - padding
    - background-color
    - border-style
    - border-width
    - border-color
    - border-radius
    - box-shadow

* Detail
  - รายละเอียดที่อยู่ภายในโครงสร้าง เช่น Text, Icon
  - การวิเคราะห์รายละเอียดจำเป็นต้องอ้างอิงกับ UI ที่ได้รับจากดีไซน์เนอร์ เพราะ เราสามารถจำลองรายละเอียดได้แค่พื้นฐานเท่าที่จำเป็นเท่านั้น
  - เมื่อวิเคราะห์แล้วจะสามารถอกแบบ Child element class ได้ ซึ่งการวิเคราะห์จะแตกต่างกันไปตามประสบการณ์และนิสัยของ HTML/CSS Editor นั้นๆ
  - ตัวอย่างรายละเอียด Button

  ![Button detail](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/button-detail.png)

  จะประกอบด้วย Child element class ดังนี้
    - .button-body : เป็นส่วนที่ใช้ควบคุม Alignment
    - .button-icon : ไอค่อน
    - .button-text : ตัวอักษร

* Size
  - ขนาด
  - ตัวอย่างขนาด Button

  ![Button size](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/button-size.png)

  จะประกอบด้วย Modifier class ดังนี้
    - .is-size-sm
    - .is-size-md : ขนาด default
    - .is-size-lg

* State
  - สภาวะกลางสำหรับเปลี่ยนแปลง Structure และ Detail
  - สภาวะกลาง หมายถึง สภาวะที่ Component ใช้ร่วมกัน เช่น :hover, :focus, :active, disabled, loading
  - ข้อดีของสภาวะกลาง เมื่อมีการเปลี่ยนแปลงค่าจะสามารถแก้ไขได้ที่จุดเดียว
  - ตัวอย่างสภาวะ Button

  ![Button state](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/button-state.png)

  จะประกอบด้วย State class ดังนี้
    - .is-disabled : ปุ่มโดนห้ามมีแอคชั่นใดๆ
    - .is-loading : ปุ่มแสดงการโหลดเพื่อทำงานส่วนหนึ่งให้เสร็จ

* Modifier
  - ออฟชั่นกลางสำหรับเปลี่ยนแปลง Structure และ Detail
  - ออฟชั่นกลาง หมายถึง ออฟชั่นที่ Component มีการใช้ร่วมกัน เช่น ขนาด
  - ข้อดีของออฟชั่นกลาง เมื่อมีการเปลี่ยนแปลงค่าจะสามารถแก้ไขได้ที่จุดเดียว
  - ตัวอย่าง Button option

  ![Button modifier](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/button-modifier.jpg)

  จะประกอบด้วย Modifier class ดังนี้
    - .is-size-sm : ปุ่มขนาดเล็ก
    - .is-size-lg : ปุ่มขนาดใหญ่
    - .is-flexible : ปุ่มที่กว้างตาม Text, Icon ที่อยู่ภายในโครงสร้าง
    - .is-fluid : ปุ่มที่กว้างตาม Container

References: https://www.designil.com/button-design-ui-ux.html

### Component Setting-up

ตัวอย่างการสร้าง Button component

1. ที่ scss/components สร้างไฟล์ _buttons.scss
2. ออกแบบ Structure และ Detail
    * HTML tag และ CSS Class
    * Comment ไว้เพื่อป้องกันการลืมโครงสร้าง และทำให้คนในทีมมาหยิบไปใช้ได้ง่าย
    ```
    // Structure & Detail
    // ============================================================
    /*
    <button class="button" type="button">
      <span class="button-body">
        <img class="button-icon" src="..." alt="Icon">
        <span class="button-text">...</span>
      </span>
    </button>

    <a class="button" href="#">
      <span class="button-body">
        <img class="button-icon" src="..." alt="Icon">
        <span class="button-text">...</span>
      </span>
    </a>
    */
    ```
3. สร้าง Mixin
    * ชื่อ Mixin ของ Component ให้เริ่มต้นชื่อ Component ขั้นด้วย hyphen และตามด้วย variant
    ```
    @mixin button-variant(...) {}
    ```
    * Parameters ที่กำหนดใน Mixin จะมีความสอดคล้องกับ Structure โดยมีหลักการ คือ สร้าง Parameters ให้กับ CSS Properties ที่มีการเปลี่ยนแปลงค่าบ่อยๆ เช่น Background color, Button text color เป็นต้น
    * สร้าง CSS class/pseudo class สำหรับ Size, State และ Modifier
    ```
    // Mixins
    // ============================================================
    @mixin button-variant(
      // Body
      $button-width: $button-width-default,
      $button-height: $button-height-default,
      $button-height-small: $button-height-sm,
      $button-height-large: $button-height-lg,
      $button-padding: 0 10px,
      $button-background-color: $color-gray-3,
      $button-border-width: 0,
      $button-border-color: transparent,
      $button-border-radius: $border-radius-xs,
      $button-box-shadow: 0 0 0 rgba(0, 0, 0, 0),

      // Body hover
      $button-background-color-hover: $color-gray-2,
      $button-border-width-hover: 0,
      $button-border-color-hover: transparent,

      // Text
      $button-text-style: $text-style-primary-body-sm,
      $button-text-style-small: $text-style-primary-body-xs,
      $button-text-style-large: $text-style-primary-body-lg,
      $button-text-color: $color-white-1,

      // Text hover
      $button-text-color-hover: $color-white-1,

      // Button icon
      $button-icon-spacing-right: 10px,
      $button-icon-spacing-left: 10px
    ) {
      // Mixins
      // >>>>>>>>>>>>>>>>>>>>>>>

      // Helpers
      // >>>>>>>>>>>>>>>>>>>>>>>

      // Parent styles
      // >>>>>>>>>>>>>>>>>>>>>>>
      display: inline-block;
      min-width: $button-width;
      height: $button-height;
      padding: $button-padding;
      background-color: $button-background-color;
      border-style: solid;
      border-width: $button-border-width;
      border-color: $button-border-color;
      border-radius: $button-border-radius;
      vertical-align: middle;
      box-shadow: $button-box-shadow;
      cursor: pointer;

      // Child element styles
      // >>>>>>>>>>>>>>>>>>>>>>>
      .button-body {
        display: flex;
        height: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
      }

      .button-icon {
        display: inline-block;
        vertical-align: middle;

        &.is-text-left {
          margin-left: $button-icon-spacing-left;
        }

        &.is-text-right {
          margin-right: $button-icon-spacing-right;
        }
      }

      .button-text {
        @extend #{$button-text-style};
        color: $button-text-color;
      }

      // States
      // >>>>>>>>>>>>>>>>>>>>>>>
      &:hover {
        background-color: $button-background-color-hover;
        border-width: $button-border-width-hover;
        border-color: $button-border-color-hover;
        text-decoration: none;

        .button-text {
          color: $button-text-color-hover;
        }
      }

      &:active,
      &:focus {
        box-shadow: $button-box-shadow;
      }

      &:focus {
        outline: none;
      }

      // Modifiers
      // >>>>>>>>>>>>>>>>>>>>>>>
      // Sizes
      &.is-size-sm {
        height: $button-height-small;

        .button-text {
          @extend #{$button-text-style-small};
        }
      }

      &.is-size-lg {
        height: $button-height-large;

        .button-text {
          @extend #{$button-text-style-large};
        }
      }

      // Structures
      &.is-flexible {
        min-width: 1px;
      }

      &.is-fluid {
        width: 100%;
      }

      // States with modifiers
      // >>>>>>>>>>>>>>>>>>>>>>>
    }
    ```

### Component Usage
* ตัวอย่างการสร้าง Default button คือ ปุ่มที่ใช้ค่า Default ของ Mixin ทั้งหมด
  - ที่ Class selector ให้ใช้ @include และตามด้วยชื่อ mixin โดยไม่ต้องใส่ Parameter ลงไปในวงเล็บ
  ```
  // Default
  // ------------------------------------------------
  .button {
    // Mixins
    // >>>>>>>>>>>>>>>>>>>>>>>
    @include button-variant();

    // Helpers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Parent styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Child element styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States with modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Media queries
    // >>>>>>>>>>>>>>>>>>>>>>>
  }
  ```
* ตัวอย่างการสร้าง Primary button คือ ปุ่มที่มีสีต่างจาก Default
  - ที่ Class selector ให้ใช้ @include และตามด้วยชื่อ mixin จากนั้นใส่ Parameter และตัวแปรสี Primary ที่ต้องการเข้าไป
  ```
  // Primary
  // ------------------------------------------------
  .button-primary {
    // Mixins
    // >>>>>>>>>>>>>>>>>>>>>>>
    @include button-variant(
      $button-background-color: $color-pink-1,
      $button-background-color-hover: $color-pink-2
    );

    // Helpers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Parent styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Child element styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States with modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Media queries
    // >>>>>>>>>>>>>>>>>>>>>>>
  }
  ```
* การนำ Component มาใช้ในรูปแบบ mixin จะมีข้อดีดังนี้
  - สืบทอดค่า Default CSS Properties, Child/States/Modifiers class ต่างๆ มาได้ทั้งหมด (Extend)
  - สามารถเพิ่ม Child/States/Modifiers class ที่มีเฉพาะ Component ตัวหนึ่งๆ ได้ โดยไม่กระทบกับ Component อื่นๆ ที่ใช้ mixins ตัวเดียวกัน

## Collection
* Collection หรือ Complex component คือ การนำ Component มากกว่า 1 ตัวมาประกอบเข้าด้วยกัน
* Anatomy จะเหมือนกับ Component ที่ประกอบด้วย Structure, Detail, Size, State และ Modifier รวมไปถึงการ Setting-up และ Usage
* Setting-up จะมีส่วนที่แตกต่างเล็กน้อย คือ จะมีการนำ Component อื่นมาใช้เป็น Child ด้วย โดยการ @include

### Collection Example
* การสร้าง Card คือ การ์ดที่มีรูปภาพ หัวข้อ คำอธิบาย และปุ่ม

  ![Card](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/card-with-excerpt.jpg)

1. scss/collections สร้างไฟล์ _cards.scss
2. ออกแบบ Structure และ Detail
    * Structure ของ Card จะประกอบด้วย media และ button component
    * HTML tag และ CSS Class
    * Comment ไว้เพื่อป้องกันการลืมโครงสร้าง และทำให้คนในทีมมาหยิบไปใช้ได้ง่าย
    ```
    // Structure & Detail
    // ============================================================
    /*
    <div class="card">
      <div class="card-header">
        <div class="card-image">
          <div class="media-16-9">
            <img src="./assets/images/contents/home-banner.jpg" alt="Cover">
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">
          <h2>Japanese Nadeshiko</h2>
        </div>
        <div class="card-description">
          <p>a japanese term used to praise the unadorned, clean beauty of a japanese woman</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-button">
          <a class="button-primary" href="#" target="_blank">
            <span class="button-body">
              <span class="button-text">See detail</span>
            </span>
          </a>
        </div>
      </div>
    </div>
    */
    ```
3. สร้าง Mixin
    * ชื่อ Mixin ของ Collection ให้เริ่มต้นชื่อ Collection ขั้นด้วย hyphen และตามด้วย variant
    ```
    @mixin card-variant(...) {}
    ```
    * Parameters ที่กำหนดใน Mixin จะมีความสอดคล้องกับ Structure โดยมีหลักการ คือ สร้าง Parameters ให้กับ CSS Properties ที่มีการเปลี่ยนแปลงค่าบ่อยๆ เช่น Background color, Padding, Margin เป็นต้น
    * สร้าง CSS class/pseudo class สำหรับ Size, State และ Modifier
    ```
    // Mixins
    // ============================================================
    @mixin card-variant(
      $card-background-color: transparent,
      $card-border-radius: 0,
      $card-box-shadow: none,

      // Header
      $card-header-padding: 0,
      $card-header-spacing-bottom: 15px,

      // Body
      $card-body-padding: 0,
      $card-body-spacing-bottom: 20px,

      // Footer
      $card-footer-padding: 0,
      $card-footer-alignment-horozontal: flex-start,

      // Image
      $card-image-spacing-bottom: 0,

      // Title
      $card-title-spacing-bottom: 10px,
      $card-title-text-style: $text-style-primary-heading-xs-bold,

      // Description
      $card-description-spacing-bottom: 0,
      $card-description-text-style: $text-style-primary-body-sm
    ) {
      // Mixins
      // >>>>>>>>>>>>>>>>>>>>>>>

      // Helpers
      // >>>>>>>>>>>>>>>>>>>>>>>

      // Parent styles
      // >>>>>>>>>>>>>>>>>>>>>>>
      background-color: $card-background-color;
      border-radius: $card-border-radius;
      box-shadow: $card-box-shadow;

      // Child element styles
      // >>>>>>>>>>>>>>>>>>>>>>>
      .card-header {
        padding: $card-header-padding;
        margin-bottom: $card-header-spacing-bottom;
      }

      .card-body {
        padding: $card-body-padding;
        margin-bottom: $card-body-spacing-bottom;
      }

      .card-footer {
        display: flex;
        justify-content: $card-footer-alignment-horozontal;
      }

      .card-image {
        margin-bottom: $card-image-spacing-bottom;
      }

      .card-title {
        margin-bottom: $card-title-spacing-bottom;

        * {
          @extend #{$card-title-text-style}
        }
      }

      .card-description {
        margin-bottom: $card-description-spacing-bottom;

        * {
          @extend #{$card-description-text-style}
        }
      }

      .card-button {
        display: inline-block;
      }

      // States
      // >>>>>>>>>>>>>>>>>>>>>>>

      // Modifiers
      // >>>>>>>>>>>>>>>>>>>>>>>

      // States with modifiers
      // >>>>>>>>>>>>>>>>>>>>>>>
    }
    ```

### Usage
* ตัวอย่างการสร้าง Default card คือ Card ที่ใช้ค่า Default ของ Mixin ทั้งหมด
  - ที่ Class selector ให้ใช้ @include และตามด้วยชื่อ mixin โดยไม่ต้องใส่ Parameter ลงไปในวงเล็บ
  ```
  // Default
  // ------------------------------------------------
  .card {
    // Mixins
    // >>>>>>>>>>>>>>>>>>>>>>>
    @include card-variant();

    // Helpers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Parent styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Child element styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States with modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Media queries
    // >>>>>>>>>>>>>>>>>>>>>>>
  }
  ```
* ตัวอย่างการสร้าง Primary card คือ Card ที่มีลักษณะต่างจาก Default
  - ที่ Class selector ให้ใช้ @include และตามด้วยชื่อ mixin จากนั้นใส่ Parameter และตัวแปรสี Primary ที่ต้องการเข้าไป
  ```
  // Primary
  // ------------------------------------------------
  .card-primary {
    // Mixins
    // >>>>>>>>>>>>>>>>>>>>>>>
    @include card-variant(
      $card-background-color: $color-gray-1,
      $card-border-radius: $border-radius-sm,
      $card-box-shadow: $box-shadow-1,

      // Body
      $card-body-padding: 0 20px,

      // Footer
      $card-footer-padding: 0 20px 20px 20px,
      $card-footer-alignment-horozontal: flex-end,

      // Title
      $card-title-text-color: $color-white-1,

      // Description
      $card-description-text-color: $color-white-1
    );

    // Helpers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Parent styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Child element styles
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // States with modifiers
    // >>>>>>>>>>>>>>>>>>>>>>>

    // Media queries
    // >>>>>>>>>>>>>>>>>>>>>>>
  }
  ```

## Calibrate font
* แนวทางการจัดการเว็บไซต์หลายภาษา กรณีมีการใช้ Font family ของแต่ละภาษาเป็นคนละชนิดกัน
* ปัญหาที่เกิดขึ้น คือ Font size, Line height, Letter spacing ของแต่ละ Font family จะแตกต่างกัน ทำให้ Design พัง ตัวอย่างเช่น Design ที่ทำออกมาเพื่อ Font family ภาษาไทย เมื่อเปลี่ยนไปใช้ Font family ภาษาอังกฤษ ที่ Font size, Line height, Letter spacing เดียวกัน กลับแสดงผลไม่เหมือนกัน จึงเป็นสาเหตุให้เราต้องทำการเทียบค่า Font size, Line height, Letter spacing ของ Font family ทั้ง 2 ชนิดใหม่ เพื่อให้ได้การแสดงผลเดียวกัน

### Calibrate font Setting-up
1. นำ Font family ของอีกภาษาเพิ่มเข้าไปที่ fonts folder
2. ที่ scss/bases สร้างไฟล์ _variables-en.scss ทำตามขั้นตอนดังนี้
    * นำ Variables ของ Typography ได้แก่ Font families, Font sizes, Line heights, Letter spacings มาใส่
    * นำ !default ที่เป็น Flag สำหรับแสดงค่าตั้งต้นของ Variables ออก เพื่อเราจะเปลี่ยนค่า Variables ใหม่แทนค่าเดิมได้
    * Import ไฟล์ _variables-en.scss เข้าไปที่ main-en.css โดยวางต่อจาก Variables เดิม
    ```
    @import 'bases/variables';
    @import 'bases/variables-en'; // Overwrite typography default variables
    ```
    * ตั้งค่า Variables ของ English Typography ใหม่
    ```
    // Font families
    // ============================================================
    $font-family-primary-medium: Roboto-Slab-Regular;
    $font-family-primary-bold: Roboto-Slab-Bold;

    // Font sizes
    // ============================================================
    // Primary body
    $font-size-primary-body-xs: 12px;
    $font-size-primary-body-sm: 14px;
    $font-size-primary-body-md: 16px;
    $font-size-primary-body-lg: 18px;
    $font-size-primary-body-xl: 20px;

    // Primary heading
    $font-size-primary-heading-xs: 24px;
    $font-size-primary-heading-sm: 28px;
    $font-size-primary-heading-md: 32px;
    $font-size-primary-heading-lg: 36px;
    $font-size-primary-heading-xl: 48px;

    // Line heights
    // ============================================================
    $line-height-primary-body: 1.3;
    $line-height-primary-heading: 1.6;

    // Letter spacings
    // ============================================================
    $letter-spacing-primary-body: normal;
    $letter-spacing-primary-heading: normal;
    ```
3. เปิดหน้า typography-compare.html เพื่อทำการเปรียบเทียบและปรับค่า Variables ของ English Typography ใหม่

## How to using other CSS framework in project
* ปัญหาของการนำ CSS framework มาใช้ในโปรเจค ได้แก่
  - ใช้ Class ของ CSS Framework แค่บางส่วน (น้อยกว่า 50%) เนื่องจาก Designer ไม่ได้ออกแบบโดยใช้ CSS Framework เป็น Base
  - เขียนทับ Class ของ CSS Framework ที่นำมาใช้ เพื่อให้เข้ากันกับ Design ทำให้เกิดความซับซ้อนของ Class โดยไม่จำเป็น
  - CSS Framework มักจะเอาชื่อ Class ที่มีความเป็น Conventional ที่ดีไปใช้หมดแล้ว ทำให้ยากต่อการตั้งชื่อ Class ใหม่และมีโอกาสที่จะตั้งชื่อแล้วซ้ำกัน
* แนวทางการนำ CSS framework มาใช้ในโปรเจค เพื่อหลีกเลี่ยงปัญหาต่างๆ คือ การแบ่งส่วน Class ที่จะใช้ออกมาใส่ไว้ในโปรเจคของเรา (ไม่เอามาทั้งหมด)

### Vendor Setting-up
1. ไปที่ Repository ของ CSS Framework แล้วหาไฟล์ CSS ที่ไม่ Minified และทำการ Copy มาใส่ในโปรเจค ตัวอย่างเช่น
    * ต้องการใช้งาน Grids ของ Bootstrap ไปที่ https://github.com/twbs/bootstrap/tree/v4-dev/dist/css
    * Copy เฉพาะส่วนของ Grids
2. ที่ scss/vendors ให้สร้างไฟล์ SCSS ตามชื่อ CSS Framework เช่น _bootstrap.scss และนำ CSS ที่ทำการ Copy มาวางลงไป
    * ให้เขียน Comment ที่หัว โดยมีรายละเอียด ดังนี้
      - ชื่อ CSS Framework และตัวเลข Version
      - ชื่อ Element/Component Class และ GitHub Link ของ CSS Framework
      ```
      * Bootstrap v4.0.0
        - Grids (https://github.com/twbs/bootstrap/blob/v4-dev/dist/css/bootstrap-grid.css)
      ```
    * สร้าง Class wrapper เป็นชื่อของ CSS Framework นั้นๆ ครอบ CSS ที่ Copy มาเพื่อป้องกันการซ้ำซ้อนกันของ Class name
      ```
      .bootstrap {
        // Classes from Bootstrap
      }
      ```
3. ที่ main.scss ให้ import ไฟล์ไว้หลัง Bases และก่อน Components กับ Collections เพื่อในอนาคตอาจจะมีความจำเป็นต้อง Overwrite class ของ CSS Framework ที่นำมาใช้ภายใน Components หรือ Collections
```
// Helpers > Mixins
// ============================================================
@import '...'

// Bases
// ============================================================
@import '...'

// Helpers > Utilities
// ============================================================
@import '...'

// Vendors
// ============================================================
@import 'vendors/bootstrap';

// Components
// ============================================================
@import '...'

// Layouts
// ============================================================
@import 'layouts/topbar';

// Pages
// ============================================================
@import '...'
```

## How to overwrite javascript vendor style in project

* ตัวอย่างการนำ Slick ที่เป็น jQuery สำหรับสร้าง Carousel มาใช้งานและเขียนแก้ไข Style

### Javascript vendor Setting-up

1. ติดตั้ง Slick ในโปรเจค (include CSS และ JS) และนำมาใช้งาน

    ![VSCode extensions](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/slick-carousel.jpg)

2. ต้องการเปลี่ยนสี Active ของ Bullet pagination ให้ทำตามขั้นตอน ดังนี้
    * ที่ scss/vendors ให้สร้างไฟล์ SCSS ตามชื่อ Vendor คือ _slick.scss
    * ให้เขียน Comment ที่หัว โดยมีรายละเอียด ดังนี้
      - ชื่อ Vendor และตัวเลข Version
      - GitHub Link ของ Vendor
      ```
      * Slick v1.8.1
        - https://github.com/kenwheeler/slick/
      ```
    * สร้าง Class wrapper เป็นชื่อของ Javascript vendor นั้นๆ โดยมี Prefix คือ js- นำหน้าชื่อไว้ เพื่อบ่งบอกว่าโครงสร้างส่วนนี้ทำงานร่วมกับ Javascript
    * จุดประสงค์อีกหนึ่งอย่างของการสร้าง Class wrapper ครอบ Class ของ Javascript vendor ก็เพื่อให้ได้มาซึ่งการ Overwrite CSS Properties ของ Class นั้นๆ
      ```
      .js-slick {
        // Bullet pagination
        // ------------------------------------------------
        .slick-dots {
          li {
            // Active
            &.slick-active {
              button {
                &:before {
                  opacity: 1;
                  color: $color-red-1;
                }
              }
            }
          }
        }
      }
      ```
3. ที่ main.scss ให้ import ไฟล์ไว้หลัง Bases และก่อน Components กับ Collections เพื่อในอนาคตอาจจะมีความจำเป็นต้อง Overwrite class ของ Javascript vendor ที่นำมาใช้ภายใน Components หรือ Collections
```
// Helpers > Mixins
// ============================================================
@import '...'

// Bases
// ============================================================
@import '...'

// Helpers > Utilities
// ============================================================
@import '...'

// Vendors
// ============================================================
@import 'vendors/slick';

// Components
// ============================================================
@import '...'

// Layouts
// ============================================================
@import 'layouts/topbar';

// Pages
// ============================================================
@import '...'
```

## Git comment
* ในกรณีทำโปรเจคร่วมกับทีมที่ประกอบด้วย HTML/CSS Editor, Frontend(Script) และ Backend ให้ทำ Label ด้านหน้าของ Comment เพื่อแจ้งให้คนในทีมทราบด้วยว่าแก้ไขอะไรไป
* Comment ให้เขียนด้วย Lowercase ทั้งหมด
  - HTML
    ```
    git commit -m "html: edit login form"
    ```
  - CSS
    ```
    git commit -m "css: change title size"
    ```
  - HTML และ CSS
    ```
    git commit -m "html/css: edit about page"
    ```
  - Content เช่น Image, Icon, Font, Document
    ```
    git commit -m "content: add facebook icon"
    ```
  - JS/Plugin/Library
    ```
    git commit -m "js: add swiperjs to home page"
    ```
* Comment กรณีมีหลายๆ เคสรวมกันให้ใช้ | ขั้นแต่ละเคสไว้
```
git commit -m "html/css: edit about page | content: add facebook icon | js: add swiperjs to home page"
```

## VSCode extensions and settings
* Extensions

  ![VSCode extensions](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/vscode-extensions.jpg)

* Settings
  - File > Preferences > Settings > User Settings
  - Default settings สำหรับเขียน Code ในโปรเจค สามารถปรับแต่งเพิ่มได้
  ```
  {
    "editor.detectIndentation": false,
    "editor.formatOnPaste": true,
    "editor.minimap.enabled": true,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.tabSize": 2,
    "editor.wordWrap": "on",
    "editor.snippetSuggestions": "top",
    "window.zoomLevel": 0,
    "files.trimTrailingWhitespace": true,
    // Use JavaScript Standard Style instead VSCode validation
    "javascript.validate.enable": false,
    "vsicons.projectDetection.disableDetect": true,
    "workbench.iconTheme": "vscode-icons",
    "emmet.syntaxProfiles": {
        "javascript": "jsx"
    },
    "files.associations": {
        "*.js": "javascriptreact"
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "sublimeTextKeymap.promptV3Features": true,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  }
  ```

## Start project by browser sync
* Style Guideline Oldschool นี้สามารถนำไปใช้เป็น Starter ของโปรเจคได้ โดยมีวิธีการติดตั้งและใช้งานดังนี้
  - ไปที่ https://github.com/Nattarat/style-guideline-oldschool และ Download

      ![Style guide oldschool download](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/style-guide-oldschool-download.png)

  - ลง Modules โดยใช้คำสั่ง (จำเป็นต้องลง [Node.js](https://nodejs.org/en/))
  ```
  npm install
  ```
  - สั่ง Run project โดยใช้คำสั่ง
  ```
  npm start
  ```
  - เริ่มทำ Project ได้ โดยเมื่อมีการแก้ไข Files ต่างๆ Browser จะทำการ Refresh ให้อัตโนมัติ
  - สั่ง Stop project โดยใช้กด Ctrl + c และพิมพ์ y

## CSS Processsor compile program
* โปรแกรม Compile SCSS เป็น CSS แนะนำให้ใช้ [Prepros](https://prepros.io/) โดย Compile settings ดังนี้

    ![Prepros compile settings](https://raw.githubusercontent.com/Nattarat/style-guideline-oldschool/master/README-images/prepros.jpg)

* ชื่อไฟล์ที่ Compile ไปยัง assets/css ให้ตั้งเป็น main.min.css
