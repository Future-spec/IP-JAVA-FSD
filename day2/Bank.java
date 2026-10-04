public class Bank {
    int balance;
    public Bank(int b) {
        this.balance = b;
    }
    public void showBalance() {
        System.out.println("The balance is: " + this.balance);
    }
    public void deposit(int amount) {
        this.balance += amount;
        System.out.println("Deposited: " + amount);
    }
    public void withdraw(int amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            System.out.println("Withdrawn Amount : " + amount);
        } else {
            System.out.println("Insufficient balance. Cannot Withdraw ! ");
        }
    }
}

class HDFC extends Bank {
    public HDFC(int b) {
        super(b);
    }
}

class SBI extends Bank {
    public SBI(int b) {
        super(b);
    }
    public void withdraw(int amount){
        this.balance = this.balance - amount - 50;
    }
}

class Main {
    public static void main(String[] args) {
    //     Bank acc1 = new Bank(1000);
    //  acc1.showBalance();
    //  acc1.deposit(500);
    //  acc1.showBalance();
    //  acc1.withdraw(1300);
    //  acc1.showBalance();
    // HDFC acc2 = new HDFC(10000);
    // acc2.showBalance();
    // acc2.deposit(500);
    // acc2.showBalance();
    // acc2.withdraw(1300);
    // acc2.showBalance();
    SBI acc3 = new SBI(10000);
        acc3.showBalance();
     acc3.deposit(500);
     acc3.showBalance();
     acc3.withdraw(1300);
     acc3.showBalance();
    }
}