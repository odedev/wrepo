package dev.odes.app.data.utils;

import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import dev.odes.app.data.value.RsaKeyPair;

import java.security.Security;
import java.math.BigInteger;
import java.security.*;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.Signature;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;

import javax.crypto.Cipher;

public class EthUtils {

    private static final String EC_ALGORITHM = "EC";

    private static final String EC_PROVIDER = "BC";

    private static final String ECIES_ALGORITHM = "ECIES";

    private static final String SIGNATURE = "SHA256withECDSA";


    static{
        try{
            Security.addProvider(new BouncyCastleProvider());
        }catch(Exception e){
            e.printStackTrace();
        }
    }


    /**
     * ECC算法公私钥生成
     *
     * @return
     */
    public static RsaKeyPair generateEccKeyPair() {
        KeyPairGenerator keyPairGenerator = null;
        try {
            keyPairGenerator = KeyPairGenerator.getInstance("EC");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        // 这里取值：secp256k1
        ECGenParameterSpec ecGenParameterSpec = new ECGenParameterSpec("secp256k1");
        try {
            keyPairGenerator.initialize(ecGenParameterSpec, new SecureRandom());
        } catch (InvalidAlgorithmParameterException e) {
            e.printStackTrace();
        }
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        // 获取公钥
        PublicKey publickey = keyPair.getPublic();
        // 获取私钥
        PrivateKey privatekey = keyPair.getPrivate();

        String publicKeyString = Base64.encodeBase64String(publickey.getEncoded());
        String privateKeyString = Base64.encodeBase64String(privatekey.getEncoded());
        return new RsaKeyPair(publicKeyString, privateKeyString);

    }


    public static String eccEncrypt(byte[] publicKeyBytes, String data) {
        try {
            X509EncodedKeySpec x509EncodedKeySpec2 = new X509EncodedKeySpec(publicKeyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance(EC_ALGORITHM);
            PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec2);
            Cipher cipher = Cipher.getInstance(ECIES_ALGORITHM, EC_PROVIDER);
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            byte[] result = cipher.doFinal(data.getBytes());
            return Base64.encodeBase64String(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public static String eccDecrypt(byte[] privateKeyBytes, String data) {
        try {
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec5 = new PKCS8EncodedKeySpec(privateKeyBytes);
            KeyFactory keyFactory = KeyFactory.getInstance(EC_ALGORITHM);
            PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec5);
            Cipher cipher = Cipher.getInstance(ECIES_ALGORITHM, EC_PROVIDER);
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            byte[] result = cipher.doFinal(Base64.decodeBase64(data));
            return new String(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public static String eccSign(String privateKey, String data) {
        try {
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec5 = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKey));
            KeyFactory keyFactory = KeyFactory.getInstance(EC_ALGORITHM);
            PrivateKey key = keyFactory.generatePrivate(pkcs8EncodedKeySpec5);
            Signature signature = Signature.getInstance(SIGNATURE);
            signature.initSign(key);
            signature.update(data.getBytes());
            return new String(Base64.encodeBase64(signature.sign()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean eccVerify(String publicKey, String srcData, String sign) {
        try {
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(Base64.decodeBase64(publicKey));
            KeyFactory keyFactory = KeyFactory.getInstance(EC_ALGORITHM);
            PublicKey key = keyFactory.generatePublic(keySpec);
            Signature signature = Signature.getInstance(SIGNATURE);
            signature.initVerify(key);
            signature.update(srcData.getBytes());
            return signature.verify(Base64.decodeBase64(sign.getBytes()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}
