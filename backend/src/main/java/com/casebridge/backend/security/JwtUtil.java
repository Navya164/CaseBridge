package com.casebridge.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import org.springframework.stereotype.Component;
import java.util.Date;
@Component

public class JwtUtil {

    private static final String SECRET =
            "casebridgecasebridgecasebridge123456";

    private static final Key KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String generateToken(String email) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )

                .signWith(KEY)

                .compact();
    }

    public static String extractEmail(String token) {

        return Jwts.parserBuilder()

                .setSigningKey(KEY)

                .build()

                .parseClaimsJws(token)

                .getBody()

                .getSubject();
    }
}