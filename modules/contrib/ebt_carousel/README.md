<!-- @codingStandardsIgnoreFile -->
# Extra Block Types (EBT): Carousel

Extra Block Types: Carousel module provides ability to add a block
with Tiny Slider.

For a full description of the module, visit the
[project page](https://www.drupal.org/project/ebt_carousel).

Submit bug reports and feature suggestions, or track changes in the
[issue queue](https://www.drupal.org/project/issues/ebt_carousel).


## Table of contents

- Requirements
- Recommended modules
- Installation
- Configuration
- Troubleshooting
- FAQ
- Maintainers


## Requirements

This module requires the following modules:
   - [EBT Core](https://www.drupal.org/project/ebt_core)
   - [Paragraphs](https://www.drupal.org/project/paragraphs)

EBT Modules use Media module with Media Image type for background images.
Check Media Image type exists before install EBT Core module.


## Recommended modules

EBT modules provide ability to add different blocks
in Layout Builder in few clicks.
You can install separate block types from this bunch of EBT modules:
- [EBT Accordion / FAQ](https://www.drupal.org/project/ebt_accordion)
- [EBT Basic Button](https://www.drupal.org/project/ebt_basic_button)
- [EBT Bootstrap Button](https://www.drupal.org/project/ebt_bootstrap_button)
- [EBT Call to Action](https://www.drupal.org/project/ebt_cta)
- [EBT Carousel](https://www.drupal.org/project/ebt_carousel)
- [EBT Counter](https://www.drupal.org/project/ebt_counter)
- [EBT Quote](https://www.drupal.org/project/ebt_quote)
- [EBT Slick Slider](https://www.drupal.org/project/ebt_slick_slider)
- [EBT Slideshow](https://www.drupal.org/project/ebt_slideshow)
- [EBT Stats](https://www.drupal.org/project/ebt_stats)
- [EBT Tabs](https://www.drupal.org/project/ebt_tabs)
- [EBT Text](https://www.drupal.org/project/ebt_text)
- [EBT Timeline](https://www.drupal.org/project/ebt_timeline)
- [EBT Webform](https://www.drupal.org/project/ebt_webform)
- [EBT Webform Popup](https://www.drupal.org/project/ebt_webform_popup)

More about EBT blocks read on EBT Core module page:
[EBT Core](https://www.drupal.org/project/ebt_core)

If you want to enhance UI for adding blocks from Layout builder try this module:
[Layout Builder Modal](https://www.drupal.org/project/layout_builder_modal)


## Installation

Install as you would normally install a contributed Drupal module. Visit
https://www.drupal.org/node/1897420 for further information.


## Configuration

EBT Core has configuration form with Primary/Secondary colors
and Mobile/Tablet/Desktop breakpoints in
Administration » Configuration » Content authoring
» Extra Block Types (EBT) settings

These configs will be applied to other EBT blocks by default.


## Troubleshooting

- If you see the error during EBT modules installation:
  "The EBT Carousel needs to be created "Image" media type.
  (Currently using Media type Image version Not created)"
  Then you need to create Image media type:
  Structure » Media types » Add media type
- If you use Field Layout module,
  it will automatically apply Layout Builder for new EBT block types.
  So you will need to disable Layout Builder for displaying block type fields:

   /admin/structure/block/block-content/manage/ebt_carousel/display/default


## FAQ

**Q: Can I use only one EBT block type, for example EBT Slideshow, without other modules?**

**A:** Yes, sure. EBT block types tend to be standalone modules.
       You can install only needed block types.


## Maintainers

- Ivan Abramenko - [levmyshkin](https://www.drupal.org/u/levmyshkin)
- Narine Tsaturyan - [Narine_Tsaturyan](https://www.drupal.org/u/narine_tsaturyan)
