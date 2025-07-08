<?php

namespace Drupal\studentsdbexample\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Link;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;

/**
 * Class DisplayTableController.
 *
 * @package Drupal\studentsdbexample\Controller
 */
class DisplayTableController extends ControllerBase {

  protected $conn;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('database')
    );
  }

  /**
   * AdminController constructor.
   *
   * @param Drupal\Core\Database\Connection $db
   *   Renderer service for the container.
   */
  public function __construct(Connection $db) {
    $this->conn = $db;
  }

  /**
   * {@inheritdoc}
   */
  public function getContent() {
    // First we'll tell the user what's going on. This content can be found
    // in the twig template file: templates/description.html.twig.
    // @todo: Set up links to create nodes and point to devel module.
    $build = [
      'description' => [
        '#theme' => 'studentsdbexample_description',
        '#description' => 'foo',
        '#attributes' => [],
      ],
    ];
    return $build;
  }

  /**
   * Display.
   *
   * @return string
   *   Return form.
   */
  public function display() {
    // Create table header.
    $header_table = [
      'id' => $this->t('SrNo'),
      'name' => $this->t('Name'),
      'mobilenumber' => $this->t('MobileNumber'),
      'age' => $this->t('Age'),
      'gender' => $this->t('Gender'),
      'opt' => $this->t('operations'),
      'opt1' => $this->t('operations'),
    ];

    // Select records from table.
    $query = $this->conn->select('studentsdbexample', 'm');
    $query->fields('m', [
      'id',
      'name',
      'mobilenumber',
      'email',
      'age',
      'gender',
      'website',
    ]);
    $results = $query->execute()->fetchAll();
    $rows = [];
    foreach ($results as $data) {
      $delete = Url::fromUserInput('/studentsdbexample/form/delete/' . $data->id);
      $edit = Url::fromUserInput('/studentsdbexample/form/studentsdbexample?num=' . $data->id);

      // Print the data from table.
      $rows[] = [
        'id' => $data->id,
        'name' => $data->name,
        'mobilenumber' => $data->mobilenumber,
        'age' => $data->age,
        'gender' => $data->gender,
        'link1' => Link::fromTextAndUrl($this->t('Delete'), $delete),
        'link2' => Link::fromTextAndUrl($this->t('Edit'), $edit),
      ];
    }
    // Display data in site.
    $form['table'] = [
      '#type' => 'table',
      '#header' => $header_table,
      '#rows' => $rows,
      '#empty' => $this->t('No users found'),
    ];

    return $form;
  }

}
