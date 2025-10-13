#!/bin/bash

# Domain Verification Script
# Tests that custom domains are routing correctly

echo "🔍 Testing Custom Domain Routing..."
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_url() {
    local url=$1
    local description=$2
    
    echo -n "Testing ${description}... "
    
    # Get HTTP status code
    status=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
    
    if [ "$status" -eq 200 ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Status: $status)"
        return 1
    fi
}

echo "📍 Testing Jim Frankenstein Domain:"
echo "-----------------------------------"
test_url "https://jimfrankenstein.com" "jimfrankenstein.com (homepage)"
test_url "https://www.jimfrankenstein.com" "www.jimfrankenstein.com (homepage)"
test_url "https://jimfrankenstein.com/songs" "jimfrankenstein.com/songs"
test_url "https://jimfrankenstein.com/songs/weird" "jimfrankenstein.com/songs/weird"

echo ""
echo "📍 Testing The Very Bad Days Domain:"
echo "------------------------------------"
test_url "https://theverybaddays.com" "theverybaddays.com (homepage)"
test_url "https://www.theverybaddays.com" "www.theverybaddays.com (homepage)"
test_url "https://theverybaddays.com/songs" "theverybaddays.com/songs"
test_url "https://theverybaddays.com/songs/devils-door" "theverybaddays.com/songs/devils-door"

echo ""
echo "📍 Checking Headers:"
echo "-------------------"

echo "Jim Frankenstein headers:"
curl -s -I https://jimfrankenstein.com | grep -E "(x-vercel|cache|status)"

echo ""
echo "The Very Bad Days headers:"
curl -s -I https://theverybaddays.com | grep -E "(x-vercel|cache|status)"

echo ""
echo "===================================="
echo "✅ Verification Complete!"
echo ""
echo "If all tests passed, your custom domains are working correctly."
echo "If tests failed, check DOMAIN_SETUP.md for troubleshooting steps."

