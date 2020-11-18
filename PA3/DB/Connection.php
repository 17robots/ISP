<?php
  class Connection {
    private $servername;
    private $username;
    private $password;
    public $connection;
    private $dbName;

    function __construct() {
      $this->servername = 'localhost';
      $this->username = 'librarian';
      $this->password = 'librarian';
      $this->dbName = 'zippybook';
      $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbName);
      if($this->connection->connect_error) {
        echo $this->connection->connect_error; 
      }
    }

    public function open() {
    }

    public function query($sql) {
      return $this->connection->query($sql);
    }

    public function close() {
      $this->connection->close();
    }
  }
?>
