<?php
   header("Content-type:text/html;charset:UTF-8");
       include('dcw-lj.php');
       $lxfs=$_REQUEST['lxfs'];
       $sql="select * from yhxx where dlxfs='$lxfs'";
       $result=$conn->query($sql);
          if($result->num_rows>0){
                     echo 0;
           }else{
                     echo 1;
           }
          $conn->close();
?>
