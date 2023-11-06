package dev.odes.app.data.utils;

public class ConvertionUtils {

    // byte[] 转16进制
    public static String bytesToHexString(byte[] src){
        if (src == null || src.length <= 0) {
            return null;
        }
        StringBuilder stringBuilder = new StringBuilder("");
        for (byte b : src) {
            int v = b & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }

    // 16进制字符串转byte[]
    public static byte[] hexStringToBytes(String hexString) {
        if (hexString == null || "".equals(hexString)) {
            return null;
        }
        hexString = hexString.toUpperCase();
        int length = hexString.length() / 2;
        char[] hexChars = hexString.toCharArray();
        byte[] d = new byte[length];
        for (int i = 0; i < length; i++) {
            int pos = i * 2;
            d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
        }
        return d;
    }

    private static byte charToByte(char c) {
        return (byte) "0123456789ABCDEF".indexOf(c);
    }


    static final byte[] HEX_TABLE = new byte[]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
    static final char[] HEX_CHAR_TABLE = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

    // byte[] 转16进制
    public static String byte2HexString(byte[] data) {
        if (data == null || data.length == 0) {
            return null;
        }
        byte[] hex = new byte[data.length * 2];
        int index = 0;
        for (byte b : data) {
            int v = b & 255;
            hex[index++] = (byte) HEX_CHAR_TABLE[v >>> 4];
            hex[index++] = (byte) HEX_CHAR_TABLE[v & 15];
        }
        return new String(hex);
    }
    // 16进制转byte[]
    public static byte[] hex2Byte(String hexString) {
        if (hexString == null || hexString.length() == 0) {
            return null;
        }
        hexString = hexString.toUpperCase();
        if (hexString.length() % 2 != 0) {
            throw new RuntimeException();
        }

        byte[] data = new byte[hexString.length() / 2];
        char[] chars = hexString.toCharArray();

        for (int i = 0; i < hexString.length(); i += 2) {
            data[i / 2] = (byte) (HEX_TABLE[getHexCharValue(chars[i])] << 4 | HEX_TABLE[getHexCharValue(chars[i + 1])]);
        }
        return data;
    }

    private static int getHexCharValue(char c) {
        int index = 0;
        for (char c1 : HEX_CHAR_TABLE) {
            if (c == c1) {
                return index;
            }
            ++index;
        }
        return 0;
    }
}
