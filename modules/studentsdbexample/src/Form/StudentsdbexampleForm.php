<?php

namespace Drupal\studentsdbexample\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Database\Database;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Database\Connection;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class StudentsdbexampleForm.
 *
 * @package Drupal\studentsdbexample\Form
 */
class StudentsdbexampleForm extends FormBase {

  protected $conn;

  /**
   * The Messenger service.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;
  
  /**
   * The RequestStack service.
   *
   * @var Symfony\Component\HttpFoundation\RequestStack
   */
  private $requestStack;

  /**
   * MyModuleService constructor.
   *
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   * @param Drupal\Core\Database\Connection $db
   *   Renderer service for the container.
   * @param Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   The request service.
   */
  public function __construct(MessengerInterface $messenger, Connection $db, RequestStack $stack) {
    $this->messenger = $messenger;
    $this->conn = $db;
	$this->requestStack = $stack;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'studentsdbexample_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $conn = Database::getConnection();
    $record = [];
	$num = $this->requestStack->getCurrentRequest()->query->get('num');
    if (isset($num)) {
      $query = $conn->select('studentsdbexample', 'm')
        ->condition('id', $num)
        ->fields('m');
      $record = $query->execute()->fetchAssoc();
    }

    $form['candidate_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Candidate Name:'),
      '#required' => TRUE,
      '#default_value' => (isset($record['name']) && $num) ? $record['name'] : '',
    ];

    $form['mobile_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Mobile Number:'),
      '#default_value' => (isset($record['mobilenumber']) && $num) ? $record['mobilenumber'] : '',
    ];

    $form['candidate_mail'] = [
      '#type' => 'email',
      '#title' => $this->t('Email ID:'),
      '#required' => TRUE,
      '#default_value' => (isset($record['email']) && $num) ? $record['email'] : '',
    ];

    $form['candidate_age'] = [
      '#type' => 'textfield',
      '#title' => $this->t('AGE'),
      '#required' => TRUE,
      '#default_value' => (isset($record['age']) && $num) ? $record['age'] : '',
    ];

    $form['candidate_gender'] = [
      '#type' => 'select',
      '#title' => $this->t('Gender'),
      '#options' => [
        'Female' => $this->t('Female'),
        'Male' => $this->t('Male'),
        '#default_value' => (isset($record['gender']) && $num) ? $record['gender'] : '',
      ],
    ];

    $form['web_site'] = [
      '#type' => 'textfield',
      '#title' => $this->t('web site'),
      '#default_value' => (isset($record['website']) && $num) ? $record['website'] : '',
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $name = $form_state->getValue('candidate_name');
    if (preg_match('/[^A-Za-z]/', $name)) {
      $form_state->setErrorByName('candidate_name',
        $this->t('your name must in characters without space'));
    }

    // Confirm that age is numeric.
    if (!intval($form_state->getValue('candidate_age'))) {
      $form_state->setErrorByName('candidate_age',
        $this->t('Age needs to be a number'));
    }

    if (strlen($form_state->getValue('mobile_number')) < 10) {
      $form_state->setErrorByName('mobile_number',
        $this->t('your mobile number must in 10 digits'));
    }

    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
	$num = $this->requestStack->getCurrentRequest()->query->get('num');
    $field = $form_state->getValues();
    $name = $field['candidate_name'];
    $number = $field['mobile_number'];
    $email = $field['candidate_mail'];
    $age = $field['candidate_age'];
    $gender = $field['candidate_gender'];
    $website = $field['web_site'];
    if (isset($num)) {
      $field = [
        'name' => $name,
        'mobilenumber' => $number,
        'email' => $email,
        'age' => $age,
        'gender' => $gender,
        'website' => $website,
      ];
      $query = $this->conn;
      $query->update('studentsdbexample')
        ->fields($field)
        ->condition('id', $num)
        ->execute();
      $this->messenger->addMessage($this->t('succesfully updated'), 'status');
      $form_state->setRedirect('studentsdbexample.display_table_controller_display');
    }
    else {
      $field = [
        'name' => $name,
        'mobilenumber' => $number,
        'email' => $email,
        'age' => $age,
        'gender' => $gender,
        'website' => $website,
      ];
      $query = $this->conn;
      $query->insert('studentsdbexample')
        ->fields($field)
        ->execute();
      $this->messenger->addMessage($this->t('succesfully saved'), 'status');
      $response = new RedirectResponse("/studentsdbexample/hello/table");
      $response->send();
    }
  }

}
