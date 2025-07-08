<?php

namespace Drupal\studentsdbexample;

/**
 * Class StudentsDBStorage.
 *
 * @package Drupal\studentsdbexample
 */
class StudentsDBStorage {

  /**
   * Get all students DB records.
   *
   * @return mixed
   *   Return DB rows of studentsdbexample table.
   */
  public static function getAll() {
    $result = \Drupal::database()->select('studentsdbexample')->execute();
    return $result;
  }

  /**
   * Check if an Id exists.
   *
   * @param string $id
   *   Student Id.
   *
   * @return bool
   *   Return boolean result from DB.
   */
  public static function exists($id) {
    return (bool) self::get($id);
  }

  /**
   * Get a record by Id.
   *
   * @param string $id
   *   The required Student Id.
   *
   * @return bool
   *   Return false|array of record.
   */
  public static function get($id) {
    $connection = \Drupal::database();
    $result = $connection->query('SELECT * FROM {studentsdbexample} WHERE id = :id', [':id' => $id])->fetchAllAssoc('id');
    if ($result) {
      return $result[$id];
    }
    else {
      return FALSE;
    }
  }

  /**
   * Add a record into Database.
   *
   * @param string $name
   *   The Student's name.
   * @param string $gender
   *   The Student's gender.
   * @param string $faculty_number
   *   The Student's faculty number.
   *
   * @throws \Exception
   */
  public static function add($name, $gender, $faculty_number) {
    $connection = \Drupal::database();
    $connection->insert('studentsdbexample')->fields([
      'name' => $name,
      'gender' => $gender,
      'faculty_number' => $faculty_number,
    ])->execute();
  }

  /**
   * Edit (update) a record into Database.
   *
   * @param string $id
   *   The Student's Id.
   * @param string $name
   *   The Student's name.
   * @param string $gender
   *   The STudent's gender.
   * @param string $faculty_number
   *   The Student's faculty number.
   */
  public static function edit($id, $name, $gender, $faculty_number) {
    $connection = \Drupal::database();
    $connection->update('studentsdbexample')->fields([
      'name' => $name,
      'gender' => $gender,
      'faculty_number' => $faculty_number,
    ])
      ->condition('id', $id)
      ->execute();
  }

  /**
   * Delete a record from DB.
   *
   * @param string $id
   *   Id of the record which will be deleted.
   */
  public static function delete($id) {
    $connection = \Drupal::database();
    $connection->delete('studentsdbexample')->condition('id', $id)->execute();
  }

}
