#include <iostream>
#include <chrono>
#include <ctime> 
#include<string>   
#include<algorithm>
using namespace std;

int main()
{

    auto start = chrono::system_clock::now();
    // Some computation here
    auto end = chrono::system_clock::now();

    chrono::duration<double> elapsed_seconds = end-start;
    time_t end_time = chrono::system_clock::to_time_t(end);
    auto * t = localtime(&end_time);
    string s("I am new");
    replace(s.begin(), s.end(), ' ', '-');
    cout<<t->tm_mday << "-"<<t->tm_mon<<'-'<<t->tm_year <<'-'<<s;

}