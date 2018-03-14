# Style Guideline Old School

* แนวทางการเขียน SCSS สำหรับการพัฒนา Web Application โดยมีเป้าหมายเพื่อให้เกิดการเขียน Code ไปในทิศทางเดียวกัน ช่วยเสริมให้การ Learning, Debug, Refactor, Review, Feedback ของทีมทำได้สะดวกและรวดเร็วขึ้น
* Guideline นี้จะมีลักษณะที่เขียน Style แยกออกมาเป็นไฟล์เดียวและ include เข้าไปที่ head โดยโปรเจคที่นำ Guideline นี้ไปใช้งาน ได้แก่ ASP.net, Magento, Symphony, Wordpress, Angular 1, None frontend framework เป็นต้น

## Table of contents
* [Syntax & Formatting](#syntax-formatting)
* [Strings](#strings)
* [Numbers](#numbers)
* [Colors](#colors)
* [Property sorting](#property-sorting)
* [Selector nesting](#selector-nesting)
* [Naming conventions](#naming-conventions)
  - [Color](#color)
  - [Font](#font)
  - [Sizing & Spacing](#sizing-spacing)
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
  - [Anatomy](#anatomy)
  - [Setting-up](#setting-up)
  - [Usage](#usage)

## Syntax & Formatting
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

### Sizing & Spacing
* ขนาดและระยะห่างให้ใช้ตัวย่อแทนชื่อเต็ม
```
.grids {
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
  * fonts
  * images
  * js
  * scss

### css
* เก็บไฟล์ CSS ที่เขียนขึ้นมาเอง และไฟล์ CSS ที่ไม่สามารถติดตั้งผ่านทาง Package manager eg. npm, yarn ได้(ต้องดาวน์โหลดมาติดตั้งเอง)

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
  * main: ไฟล์รวมสไตล์ทั้งหมดสำหรับ Compile มาเป็น main.css เพื่อนำไปใช้ในเว็บไซต์

### videos
* เก็บไฟล์ videos

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
@media (min-width: $breakpoint-mobile-lg) and (max-width: $breakpoint-tablet-lg) {
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
      @media (min-width: $breakpoint-mobile-lg) and (max-width: $breakpoint-tablet-lg) {
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

### Anatomy
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

### Setting-up
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

### Usage
* ที่ Class selector ให้ใช้ @extend และตามด้วย Text style variable
* เนื่องจากมีการส่งผ่าน Variable ไปที่ @extend จึงต้องใช้ #{...} ครอบไว้เพื่อบอกว่าไม่ใช่ String
```
.foo {
  @extend #{$text-style-primary-body-xs};
  color: $color-white-1;
}
```

## Component
### Anatomy
### Setting-up
### Usage

## Collection

## Calibrate font
* แนวทางการจัดการเว็บไซต์หลายภาษา กรณีมีการใช้ Font family ของแต่ละภาษาเป็นคนละชนิดกัน
* ปัญหาที่เกิดขึ้น คือ Font size, Line height, Letter spacing ของแต่ละ Font family จะแตกต่างกัน ทำให้ Design พัง ตัวอย่างเช่น Design ที่ทำออกมาเพื่อ Font family ภาษาไทย เมื่อเปลี่ยนไปใช้ Font family ภาษาอังกฤษ ที่ Font size, Line height, Letter spacing เดียวกัน กลับแสดงผลไม่เหมือนกัน จึงเป็นสาเหตุให้เราต้องทำการเทียบค่า Font size, Line height, Letter spacing ของ Font family ทั้ง 2 ชนิดใหม่ เพื่อให้ได้การแสดงผลเดียวกัน

###


## Start project by browser sync

## CSS Processsor compile program

## VSCode setting for react
