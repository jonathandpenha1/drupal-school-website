<?php

namespace Drupal\studentsdbexample;

/**
 * @file
 * Contains \Drupal\studentsdbexample\AddForm.
 */

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Component\Utility\Html;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class AddForm.
 *
 * @package Drupal\studentsdbexample
 */
class AddForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  protected $requestStack;

  /**
   * {@inheritdoc}
   */
  protected $id;

  /**
   * @var \Drupal\Core\Messenger\MessengerInterface $messenger
   */
  protected $messenger;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack'),
      $container->get('messenger')
    );
  }

  /**
   * AddForm constructor.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   Request stack service for the container.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   */
  public function __construct(RequestStack $request_stack, MessengerInterface $messenger) {
    $this->requestStack = $request_stack;
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  protected function request() {
    return $this->requestStack->getCurrentRequest();
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'studentsdbexample_add';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $this->id = $this->request()->get('id');
    $students = StudentsDBStorage::get($this->id);

    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Name'),
      '#default_value' => $students ? $students->name : '',
    ];
    $form['gender'] = [
      '#type' => 'radios',
      '#title' => $this->t('Gender'),
      '#default_value' => 0,
      '#options' => [
        0 => $this->t('Male'),
        1 => $this->t('Female'),
      ],
    ];
    $form['faculty_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Faculty number'),
      '#default_value' => $students ? $students->faculty_number : '',
    ];
    $form['actions'] = ['#type' => 'actions'];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $students ? $this->t('Edit') : $this->t('Add'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $name = $form_state->getValue('name');
    $gender = $form_state->getValue('gender');
    $faculty_number = $form_state->getValue('faculty_number');
    if (!empty($this->id)) {
      StudentsDBStorage::edit($this->id, HTML::escape($name), HTML::escape($gender), HTML::escape($faculty_number));
      $this->messenger->addMessage($this->t('Student has been edited.'));
    }
    else {
      StudentsDBStorage::add(HTML::escape($name), HTML::escape($gender), HTML::escape($faculty_number));
      $this->messenger->addMessage($this->t('Student has been added.'));
    }
    $form_state->setRedirect('studentsdbexample_list');
  }

}
