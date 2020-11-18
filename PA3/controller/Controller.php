<?php
  include_once('../model/Book.php');
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: access");
  header("Access-Control-Allow-Methods: POST");
  header("Content-Type: application/json");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  $textData = file_get_contents("php://input");
  $data = json_decode($textData);
  $jsonString;
  $errorObj;

  function getBooks($data) {
    $bookData = Book::findAll($data->options);
    $jsonString = json_encode($bookData);
    echo $jsonString;
  }

  function getBook($data) {
    $jsonString = json_encode(Book::findByID($data->id));
    echo $jsonString;
  }

  function addBook($data) {
    $newBook = Book::ForInsert($data->title, $data->price, $data->quantity);
    if($newBook->save()) {
      $jsonString = json_encode($newBook);
    } else {
      $errorObj["error"] = "Unable to insert into database";
      $jsonString = json_encode($errorObj);
    }
    echo $jsonString;
  }

  function updateBook($data) {
    $bookToEdit = Book::findById($data->bookid);
    $jsonString;
    if($bookToEdit->id == -1) { // not found in db
      $errorObj["error"] = "Unable to Find Record";
      $jsonString = json_encode($errorObj);
    } else {
      $bookToEdit->title = $data->title;
      $bookToEdit->price = $data->price;
      $bookToEdit->quantity = $data->quantity;
      $bookToEdit->discontinued = $data->discontinued;
      if($bookToEdit->save()) {
        $jsonString = json_encode($bookToEdit);
      } else {
        $errorObj["error"] = "Unable to Update Database";
        $jsonString = json_encode($errorObj);
      }
    }
    echo $jsonString; 
  }

  function deleteBook($data) {
    $jsonString;
    if(Book::deleteById($data->bookid)) {
      $successObj["success"] = "successfully deleted";
      $jsonString = json_encode($successObj);
    } else {
      $errorObj["error"] = "Unable to delete from database";
      $jsonString = json_encode($errorObj);
    }
    echo $jsonString;
  }

  switch($data->action) {
    case "getBooks":
      getBooks($data);
    break;
    case "getBook":
      getBook($data);
    break;
    case "addBook":
      addBook($data);
    break;
    case "updateBook":
      updateBook($data);
    break;
    case "deleteBook":
      deleteBook($data);
    break;
    default:
      $errorObj["error"] = "Action Needed";
      $jsonString = json_encode($errorObj);
      echo $jsonString;
    break;
  }
?>