public class Main {
    public String myStr = new String("Hello World");
    public static void main(String args[]) {
        Main m = new Main();
        System.out.println(m.getMyStr());
    }

    public String getMyStr() {
        return myStr;
    }
}