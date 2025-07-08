<?php

namespace Drupal\studentsdbexample;

use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class DeleteForm.
 *
 * @package Drupal\studentsdbexample
 */
class DeleteForm extends ConfirmFormBase {

  /**
   * {@inheritdoc}
   */
  protected $requestStack;

  /**
   * {@inheritdoc}
   */
  protected $id;

  /**
   * The Drupal messenger.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * The logger factory.
   *
   * @var \Drupal\Core\Logger\LoggerChannelFactoryInterface
   */
  protected $loggerFactory;

  /**
   * AddForm constructor.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   Request stack service for the container.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   The logger factory.
   */
  public function __construct(RequestStack $request_stack, MessengerInterface $messenger, LoggerChannelFactoryInterface $logger_factory) {
    $this->requestStack = $request_stack;
    $this->messenger = $messenger;
    $this->loggerFactory = $logger_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack'),
      $container->get('messenger'),
      $container->get('logger.factory')
    );
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
    return 'studentsdbexample_delete';
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return $this->t('Are you sure you want to delete student %id?', [
      '%id' => $this->id,
    ]);
  }

  /**
   * {@inheritdoc}
   */
  public function getConfirmText() {
    return $this->t('Delete');
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return new Url('studentsdbexample_list');
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $this->id = $this->request()->get('id');
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    StudentsDBStorage::delete($this->id);
    $this->loggerFactory->get('students')->notice('@type: deleted %title.', [
      '@type' => $this->id,
      '%title' => $this->id,
    ]);
    $this->messenger->addMessage($this->t('Student submission %id has been deleted.', [
      '%id' => $this->id,
    ]));
    $form_state->setRedirect('studentsdbexample_list');
  }

}
