# Extra Block Types (EBT): Core

EBT modules provide ability to add different blocks in Layout Builder in
few clicks. EBT Core contains helper functions for EBT modules.

For a full description of the module, visit the
[project page](https://www.drupal.org/project/ebt_core).

Submit bug reports and feature suggestions, or track changes in the
[issue queue](https://www.drupal.org/project/issues/ebt_core).


## Table of contents

- Requirements
- Recommended modules
- Installation
- Configuration
- Troubleshooting
- FAQ
- External Documentation
- Maintainers


## Requirements

This module requires the following modules:

- [Field Group](https://www.drupal.org/project/field_group)
- [Media Library Form API Element](https://www.drupal.org/project/media_library_form_element)

EBT Modules use Media module with Media Image type for background images.
Check Media Image type exists before install EBT Core module.


## Recommended modules-

You can install separate block types from this bunch of EBT modules:
- [EBT Accordion / FAQ](https://www.drupal.org/project/ebt_accordion)
- [EBT Basic Button](https://www.drupal.org/project/ebt_basic_button)
- [EBT Bootstrap Button](https://www.drupal.org/project/ebt_bootstrap_button)
- [EBT Call to Action](https://www.drupal.org/project/ebt_cta)
- [EBT Carousel](https://www.drupal.org/project/ebt_carousel)
- [EBT Counter](https://www.drupal.org/project/ebt_counter)
- [EBT Quote](https://www.drupal.org/project/ebt_quote)
- [EBT Micromodal](https://www.drupal.org/project/ebt_micromodal)
- [EBT Slick Slider](https://www.drupal.org/project/ebt_slick_slider)
- [EBT Slideshow](https://www.drupal.org/project/ebt_slideshow)
- [EBT Stats](https://www.drupal.org/project/ebt_stats)
- [EBT Tabs](https://www.drupal.org/project/ebt_tabs)
- [EBT Text](https://www.drupal.org/project/ebt_text)
- [EBT Timeline](https://www.drupal.org/project/ebt_timeline)
- [EBT Webform](https://www.drupal.org/project/ebt_webform)
- [EBT Webform Popup](https://www.drupal.org/project/ebt_webform_popup)


## Installation

Install as you would normally install a contributed Drupal module. For further
information, see
[Installing Drupal Modules](https://www.drupal.org/docs/extending-drupal/installing-drupal-modules).


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
  So you will need to disable Layout Builder for displaying block type fields,
  for example:

   `/admin/structure/block/block-content/manage/ebt_cta/display/default`


## FAQ

**Q: Can I use only one EBT block type, for example EBT Slideshow, without other
modules?**

**A:** Yes, sure. EBT block types tend to be standalone modules.
       You can install only needed block types.


## External Documentation

You can also view the EBT documentation at Drupal Book:
https://drupalbook.org/ebt


## Maintainers

- Ivan Abramenko - [levmyshkin](https://www.drupal.org/u/levmyshkin)
- Narine Tsaturyan - [Narine_Tsaturyan](https://www.drupal.org/u/narine_tsaturyan)
