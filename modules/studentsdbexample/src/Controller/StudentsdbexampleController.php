<?php

namespace Drupal\studentsdbexample\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class StudentsdbexampleController.
 *
 * @package Drupal\studentsdbexample\Controller
 */
class StudentsdbexampleController extends ControllerBase {

  /**
   * Display.
   *
   * @return array
   *   Return Hello string.
   */
  public function display() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('This page contain all information about my data'),
    ];
  }

}
