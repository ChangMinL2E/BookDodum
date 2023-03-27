package com.sasatech.bookdodum.service.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class TranslationService {


    public static String getEnglish(String korean) throws IOException {
        String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
        String text;
        String clientId ="pvo9dRuozIdBsr6kV5vb";
        String clientSecret = "Vjq16KLEg2";

        String result = "";
        String line = "";
        try {
            text = URLEncoder.encode(korean, "UTF-8");
            String param = "source=ko&target=en&text=" + text;
            URL url = new URL(apiURL);
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setUseCaches(false);
            con.setDefaultUseCaches(false);

            OutputStreamWriter osw = new OutputStreamWriter(con.getOutputStream());
            osw.write(param);
            osw.flush();

            int responseCode = con.getResponseCode();
            result += "responseCode  : " + responseCode;
            result += "\n";
            // 200코드가 아니면 오류인데 무엇이 오류 인지 디버깅
            if (responseCode != 200) {
                Map<String, List<String>> map = con.getRequestProperties();
                result += "Printing Response Header...\n";
                for (Map.Entry<String, List<String>> entry : map.entrySet()) {
                    if (entry.getKey().equals("apikey")) {
                        result += "";
                    } else {
                        result += "Key : " + entry.getKey() + " ,Value : " + entry.getValue();
                    }
                }
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            // 여긴 출력
            while ((line = br.readLine()) != null) {
                result += line + "\n";
            }
            br.close();

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("인코딩 실패", e);
        } catch (IOException e) {
            result = e.getMessage();
        }

        return result;

    }
}
