<?php
    header("Content-type:text/html;charset:UTF-8");
    include('dcw-lj.php');
    $dyhm=$_REQUEST['ename'];
    $dpwd=$_REQUEST['epwd'];
    $sql="select * from yhxx where dyhm='$dyhm'&&dpwd='$dpwd'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
           echo 0;
    }else{
           echo 1;
    }
    $conn->close();
?>
