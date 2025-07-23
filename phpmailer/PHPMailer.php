<?php
/**
 * PHPMailer - Versión simplificada para SMTP
 * Implementación básica para Ingenio Red
 */

class PHPMailer {
    public $Host = '';
    public $Port = 587;
    public $SMTPAuth = true;
    public $Username = '';
    public $Password = '';
    public $SMTPSecure = 'tls';
    public $CharSet = 'UTF-8';
    public $From = '';
    public $FromName = '';
    public $Subject = '';
    public $Body = '';
    public $isHTML = true;
    public $ErrorInfo = '';
    
    private $to = array();
    private $replyTo = array();
    
    const ENCRYPTION_STARTTLS = 'tls';
    
    public function __construct($exceptions = null) {
        // Constructor básico
    }
    
    public function isSMTP() {
        return true;
    }
    
    public function setFrom($address, $name = '') {
        $this->From = $address;
        $this->FromName = $name;
    }
    
    public function addAddress($address, $name = '') {
        $this->to[] = array($address, $name);
    }
    
    public function addReplyTo($address, $name = '') {
        $this->replyTo[] = array($address, $name);
    }
    
    public function isHTML($isHTML = true) {
        $this->isHTML = $isHTML;
    }
    
    public function send() {
        // Configurar headers
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        if ($this->isHTML) {
            $headers[] = "Content-Type: text/html; charset=" . $this->CharSet;
        } else {
            $headers[] = "Content-Type: text/plain; charset=" . $this->CharSet;
        }
        
        $fromHeader = $this->From;
        if ($this->FromName) {
            $fromHeader = $this->FromName . " <" . $this->From . ">";
        }
        $headers[] = "From: " . $fromHeader;
        
        if (!empty($this->replyTo)) {
            $replyToHeader = $this->replyTo[0][0];
            if ($this->replyTo[0][1]) {
                $replyToHeader = $this->replyTo[0][1] . " <" . $this->replyTo[0][0] . ">";
            }
            $headers[] = "Reply-To: " . $replyToHeader;
        }
        
        $headers[] = "X-Mailer: PHPMailer Ingenio Red";
        $headers[] = "X-Priority: 3";
        
        $headerString = implode("\r\n", $headers);
        
        // Enviar a cada destinatario
        foreach ($this->to as $recipient) {
            $to = $recipient[0];
            
            try {
                $result = mail($to, $this->Subject, $this->Body, $headerString);
                if (!$result) {
                    $this->ErrorInfo = "Error enviando email a: " . $to;
                    return false;
                }
            } catch (Exception $e) {
                $this->ErrorInfo = "Error: " . $e->getMessage();
                return false;
            }
        }
        
        return true;
    }
}

// Exception class básica
class Exception extends \Exception {
    
}
?>
