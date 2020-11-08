<?php
  include_once('../model/Book.php');
  header('Content-Type: application/json'); // since im always returning this type of info
  switch($_POST['action']) {
    case "getBooks":
      getBooks();
    break;
    case "getBook":
      getBook();
    break;
    case "addBook":
      addBook();
    case "updateBook":
      updateBook(1,1);
    break;
    case "deleteBook":
      deleteBook(1);
    break;
    default:
      echo json_encode("error" => "Action Needed");
    break;
  }

  public function getBooks() {
    $jsonString = json_encode(Book->findAll({}));
    if($jsonString != false)
      echo $jsonString;
  }

  public function getBook() {
    $jsonString = json_encode(Book->findByID($_POST['id']));
    if($jsonString == true)
      return $jsonString;
  }

  public function addBook() {
    $newBook = new Book($_POST['$title'],$_POST['$price'],$_POST['$quantity'], false);
    if($newBook->save()) {
      $jsonString = json_encode($newBook);
      if($jsonString != false) {
        return $jsonString;
      }
    }
  }

  public function updateBook($bookId, $newBookData) {
    
  }

  public function deleteBook($bookId) {

  }
?>