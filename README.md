# Style Guideline

## Introduction
แนวทางการเขียน SCSS สำหรับการพัฒนา Web Application โดยมีเป้าหมายเพื่อให้เกิดการเขียน Code ไปในทิศทางเดียวกัน ช่วยเสริมให้การ Learning, Debug, Refactor, Review, Feedback ของทีมทำได้สะดวกและรวดเร็วขึ้น

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
// IE
.ie {
  .button {
    min-width: auto;
    height: auto;
  }
}

// Edge
// Safari
// Firefox
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
// IE
// Edge
// Safari
// Firefox
```
*

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

### Fonts
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
1. name: ชื่อที่ตั้งขึ้นต้องสอดคล้องกับหน้าตา/หน้าที่ของ Component
2. extendedName: ชื่อประเภทของ Component ใช้เพื่อขยายความหมายของหน้าตาและหน้าที่
```
.card-primary {}
.container-vertical-middle {}
```

* Child component name
```
.componentName-extendedName {...}
```
โครงสร้างชื่อ ประกอบด้วย
1. componentName: ชื่อของ Component (ไม่รวม extendedName)
2. extendedName: ชื่อของ Child ใน Component ใช้เพื่อขยายความหมายของหน้าตาและหน้าที่
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

## Architecture
* โครงสร้างของ Style assets แบ่งออกเป็น 5 folders ได้แก่
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
  * contents: เก็บ image ประเภทเนื้อหา, banner, background, graphic
  * favicons
  * icons
  * logos


```
.{categoryImageName}-{imageName}_{stateName}@{imageDensity}.{extensionImageName}
```

* โครงสร้างชื่อ ประกอบด้วย
  * categoryImageName: ชื่อ Category ของ image/icon (แบ่งตาม folder)
  * imageName: ชื่อของ image/icon
  * stateName: ชื่อ state ของ image/icon เช่น hover, active, disabled, success, pending, error
  * imageDensity: density ของ image/icon เช่น 2x, 3x (ในกรณี 1x และ svg ไม่ต้องมี density กำกับ)
  * extensionImageName: นามสกุลของ image/icon เช่น jpg, gif, png, svg

* การตั้งชื่อ
  * ชื่อประกอบด้วยคำ 2 คำ ขั้นด้วยขีดกลาง(ชื่อ category folder และ ชื่อ image) และถ้าคำๆ นั้นมีคำขยายหลายคำให้เขี่ยนต่อกันโดยใช้ตัวเล็ก เช่น
    - default-user.png
    - default-coverpage.jpg
  * กรณี image อยู่ใน sub category เช่น icon(category folder) > brand(sub category folder) ให้ใช้ชื่อประกอบด้วยคำ 2 คำ ขั้นด้วยขีดกลาง(ชื่อ sub category และ ชื่อ image)
    - brand-facebook.svg
    - brand-youtube.svg
  * กรณี image มี state เช่น active, disabled, success, pending, error ให้ใช้ _ ต่อท้ายชื่อ
    - brand-facebook_hover.svg
    - brand-youtube_selected.svg
  * กรณี image มีหลาย size เช่น 32px, 64px หรือหลาย density เช่น 2x, 3x ให้ใช้ @ ต่อท้ายชื่อและระบุ size หรือ density
    - favicon@small.png
    - brand-facebook@2x.png
    - brand-youtube@3x.png
